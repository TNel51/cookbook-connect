// api/auth/user.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { ReadyDataSource } from "@/data-source";
import { User } from "../../../entities/user.entity";
import { authOptions } from "../auth/[...nextauth]";
import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Function to generate pre-signed URL
export const getSignedUrl = (key: string): Promise<string> => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: key,
    Expires: 60 * 5, // URL expires in 5 minutes
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('getObject', params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
};

const PatchBodySchema = z.object({
  displayName: z.string().optional(),
  avatarUrl: z.string().optional(), // This should store the S3 key
}).strict();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | string>,
): Promise<void> {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    res.status(400).end("Unauthenticated");
    return;
  }

  const patchInput = PatchBodySchema.safeParse(req.body);

  if (!patchInput.success) {
    res.status(400).send("Invalid Input Data");
    return;
  }

  const ds = await ReadyDataSource();
  const userRepo = ds.getRepository(User);

  if (req.method === "PATCH") {
    let user = await userRepo.findOneOrFail({ where: { id: session.user.id } });
    user = userRepo.merge(user, patchInput.data);

    await userRepo.save(user);

    // Generate a pre-signed URL for the avatar if available
    if (user.avatarUrl) {
      const key = user.avatarUrl.split('/').pop();
      user.avatarUrl = await getSignedUrl(key);
    }

    res.status(200).json(user);
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
