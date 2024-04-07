import type {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {z} from "zod";

import {
    ReadyDataSource, similarityBuilder,
} from "@/data-source";
import {Tag} from "@/entities/tag.entity";

import {authOptions} from "../auth/[...nextauth]";

const GetQuerySchema = z.object({
    key: z.string().optional(),
}).strict();

const PostBodySchema = z.object({
    code: z.string(),
}).strict();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Tag[] | Tag | string>,
): Promise<void> {
    const ds = await ReadyDataSource();
    const tagRepo = ds.getRepository(Tag);

    if (req.method === "GET") {
        const getInput = GetQuerySchema.safeParse(req.query);

        if (!getInput.success) {
            res.status(400).send("Invalid Input Data");
            return;
        }

        if (getInput.data.key) {
            const tagsBuilder = await similarityBuilder(Tag, getInput.data.key, "code", 0.2, 10);
            tagsBuilder.orWhere(`${Tag.constructor.name}.code ILIKE :query`, {query: `%${getInput.data.key.toLowerCase()}%`});
            const tags = await tagsBuilder.getMany();
    
            res.status(200).json(tags);
        } else {
            const tags = await tagRepo.find({take: 10});
            res.status(200).json(tags);
        }
    } else if (req.method === "POST") {
        const session = await getServerSession(req, res, authOptions);

        if (!session?.user) {
            res.status(400).end("Unauthenticated");
            return;
        }

        const postInput = PostBodySchema.safeParse(req.body);

        if (!postInput.success) {
            res.status(400).send("Invalid Input Data");
            return;
        }

        const tag = tagRepo.create({
            creatorId: session.user.id,
            code: postInput.data.code.toLowerCase().replaceAll(/[^a-zA-Z0-9 ]/g, ""),
        });
        await tagRepo.save(tag);

        res.status(200).json(tag);
    } else {
        res.status(405).send("Method Not Allowed");
    }
}
