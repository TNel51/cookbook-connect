import type {NextApiRequest, NextApiResponse} from "next";
import {z} from "zod";

import {getSimilar, ReadyDataSource} from "@/data-source";
import {Ingredient} from "@/entities/ingredient.entity";

const GetQuerySchema = z.object({key: z.string()}).strict();

const PostBodySchema = z.object({}).strict();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Ingredient[] | Ingredient | string>,
): Promise<void> {
    const ds = await ReadyDataSource();
    const ingredientRepo = ds.getRepository(Ingredient);

    if (req.method === "GET") {
        const getInput = GetQuerySchema.safeParse(req.query);

        if (!getInput.success) {
            res.status(400).send("Invalid Input Data");
            return;
        }

        const ingredients = await getSimilar(Ingredient, getInput.data.key, "text", 0.1);

        res.status(200).json(ingredients);
    } else if (req.method === "POST") {
        const postInput = PostBodySchema.safeParse(req.body);

        if (!postInput.success) {
            res.status(400).send("Invalid Input Data");
            return;
        }

        res.status(200).json({} as Ingredient);
    } else {
        res.status(405).send("Method Not Allowed");
    }
}
