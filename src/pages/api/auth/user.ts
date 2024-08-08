import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { ReadyDataSource } from "@/data-source";
import { User } from "../../../entities/user.entity";
import { authOptions } from "../auth/[...nextauth]";

const PatchBodySchema = z.object({
  displayName: z.string().optional(),
  avatarUrl: z.string().optional(), // This should store the S3 key
}).strict();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | string>,
): Promise<void> {
  console.log('API handler called');
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) {
    console.log('Unauthenticated request');
    res.status(400).end("Unauthenticated");
    return;
  }

  console.log('Parsing request body');
  const patchInput = PatchBodySchema.safeParse(req.body);
  if (!patchInput.success) {
    console.log('Invalid input data:', patchInput.error);
    res.status(400).send("Invalid Input Data");
    return;
  }

  console.log('Connecting to database');
  const ds = await ReadyDataSource();
  const userRepo = ds.getRepository(User);

  if (req.method === "PATCH") {
    console.log(`Updating user with id: ${session.user.id}`);
    let user = await userRepo.findOneOrFail({ where: { id: session.user.id } });
    
    // If avatarUrl is provided, ensure we're only storing the key
    if (patchInput.data.avatarUrl) {
      console.log(`Original avatarUrl: ${patchInput.data.avatarUrl}`);
      const key = patchInput.data.avatarUrl.split('/').pop()?.split('?')[0];
      patchInput.data.avatarUrl = key || patchInput.data.avatarUrl;
      console.log(`Stored avatarUrl key: ${patchInput.data.avatarUrl}`);
    }
    
    user = userRepo.merge(user, patchInput.data);
    console.log('Merged user:', user);
    await userRepo.save(user);
    console.log('User saved to database');

    console.log('Sending response');
    res.status(200).json(user);
  } else {
    console.log(`Method not allowed: ${req.method}`);
    res.status(405).send("Method Not Allowed");
  }
}
