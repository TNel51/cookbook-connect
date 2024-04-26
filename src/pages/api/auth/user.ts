import type {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {z} from "zod";

import {ReadyDataSource} from "@/data-source";

import {User} from "../../../entities/user.entity";
import {authOptions} from "../auth/[...nextauth]";

const PatchBodySchema = z.object({
    displayName: z.string(),
}).strict()
    .partial();

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
        let user = await userRepo.findOneOrFail({where: {id: session.user.id} });
        user = userRepo.merge(user, patchInput.data);

        await userRepo.save(user);

        res.status(200).json(user);
    } else {
        res.status(405).send("Method Not Allowed");
    }
}
