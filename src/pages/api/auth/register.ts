import {hash} from "bcrypt";
import type {NextApiRequest, NextApiResponse} from "next";
import {z} from "zod";

import {passwordSchema} from "@/lib/passwordSchema";

import {ReadyDataSource} from "../../../data-source";
import {User} from "../../../entities/user.entity";

const PostBodySchema = z.object({
    displayName: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
}).strict();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    const ds = await ReadyDataSource();
    const userRepo = ds.getRepository(User);

    if (req.method === "POST") {
        const postInput = PostBodySchema.safeParse(req.body);

        if (!postInput.success) {
            res.status(400).send("Invalid Input Data");
            return;
        }

        const user = await userRepo.findOne({where: {email: postInput.data.email.toLowerCase()} });
        if (user) {
            res.status(400).send("An account already exists with the provided email.");
            return;
        }

        if (!passwordSchema.validate(postInput.data.password)) {
            res.status(400).send("Invalid password.");
            return;
        }

        if (postInput.data.password !== postInput.data.confirmPassword) {
            res.status(400).send("Passwords do not match.");
            return;
        }

        const newUser = userRepo.create({
            displayName: postInput.data.displayName,
            email: postInput.data.email,
            password: await hash(postInput.data.password, 10),
        });
        await userRepo.save(newUser);
    
        res.status(200).json(newUser);
    } else {
        res.status(405).send("Method Not Allowed");
    }
}
