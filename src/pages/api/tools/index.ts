import type {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {z} from "zod";

import {
    ReadyDataSource, similarityBuilder,
} from "@/data-source";
import {Tool} from "@/entities/tool.entity";

import {titleCase} from "../../../lib/titleCase";
import {authOptions} from "../auth/[...nextauth]";

const GetQuerySchema = z.object({
    key: z.string().optional(),
}).strict();

const PostBodySchema = z.object({
    text: z.string(),
}).strict();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Tool[] | Tool | string>,
): Promise<void> {
    const ds = await ReadyDataSource();
    const toolRepo = ds.getRepository(Tool);

    if (req.method === "GET") {
        const getInput = GetQuerySchema.safeParse(req.query);

        if (!getInput.success) {
            res.status(400).send("Invalid Input Data");
            return;
        }

        if (getInput.data.key) {
            const toolsBuilder = await similarityBuilder(Tool, getInput.data.key, "text", 0.2, 10);
            toolsBuilder.orWhere(`${Tool.constructor.name}.text ILIKE :query`, {query: `%${getInput.data.key.toLowerCase()}%`});
            const tools = await toolsBuilder.getMany();
    
            res.status(200).json(tools);
        } else {
            const tools = await toolRepo.find({take: 10});
            res.status(200).json(tools);
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

        const tool = toolRepo.create({
            creatorId: session.user.id,
            text: titleCase(postInput.data.text),
        });
        await toolRepo.save(tool);

        res.status(200).json(tool);
    } else {
        res.status(405).send("Method Not Allowed");
    }
}
