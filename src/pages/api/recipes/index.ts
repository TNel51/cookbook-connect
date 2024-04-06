import type {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {z} from "zod";

import {ReadyDataSource} from "@/data-source";
import {Recipe} from "@/entities/recipe.entity";

import {authOptions} from "../auth/[...nextauth]";

const GetQuerySchema = z.object({
    take: z.string(),
    skip: z.string(),
}).strict()
    .transform(({take, skip}) => ({
        take: parseInt(take),
        skip: parseInt(skip),
    }));

const PostBodySchema = z.object({}).strict();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{recipes: Recipe[]; total: number;} | Recipe | string>,
): Promise<void> {
    const ds = await ReadyDataSource();
    const recipeRepo = ds.getRepository(Recipe);

    if (req.method === "GET") {
        const getInput = GetQuerySchema.safeParse(req.query);

        if (!getInput.success) {
            res.status(400).send("Invalid Input Data");
            return;
        }

        const [recipes, totalRecipes] = await recipeRepo.findAndCount({
            take: getInput.data.take,
            skip: getInput.data.skip,
            where: {
                public: true,
            },
        });

        res.status(200).json({total: totalRecipes, recipes: recipes});
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

        res.status(200).json({} as Recipe);
    } else {
        res.status(405).send("Method Not Allowed");
    }
}
