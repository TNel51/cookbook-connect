import type {NextApiRequest, NextApiResponse} from "next";
import {z} from "zod";

import {
    getSimilar, ReadyDataSource, similarityBuilder,
} from "@/data-source";
import {Tool} from "@/entities/tool.entity";

const GetQuerySchema = z.object({
    key: z.string(),
}).strict();

const PostBodySchema = z.object({}).strict();

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

        const toolsBuilder = await similarityBuilder(Tool, getInput.data.key, "text", 0.2, 10);
        toolsBuilder.orWhere(`${Tool.constructor.name}.text ILIKE :query`, {query: `%${getInput.data.key.toLowerCase()}%`});
        const tools = await toolsBuilder.getMany();

        res.status(200).json(tools);
    } else if (req.method === "POST") {
        const postInput = PostBodySchema.safeParse(req.body);

        if (!postInput.success) {
            res.status(400).send("Invalid Input Data");
            return;
        }

        res.status(200).json({} as Tool);
    } else {
        res.status(405).send("Method Not Allowed");
    }
}
