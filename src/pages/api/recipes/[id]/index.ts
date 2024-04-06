import type {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {z} from "zod";

import {ReadyDataSource} from "@/data-source";
import {
    Recipe, RecipeCategory, RecipeDifficulty,
} from "@/entities/recipe.entity";

import {authOptions} from "../../auth/[...nextauth]";

const PatchBodySchema = z.object({
    public: z.boolean(),
    title: z.string(),
    category: z.nativeEnum(RecipeCategory),
    difficulty: z.nativeEnum(RecipeDifficulty),
    instructions: z.string(),
    time: z.string(),
}).strict()
    .partial();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{recipes: Recipe[]; total: number;} | Recipe | string>,
): Promise<void> {
    const {id} = req.query;

    if (!id || Array.isArray(id)) {
        res.status(500).send("Failed to find Id");
        return;
    }
    const ds = await ReadyDataSource();
    const recipeRepo = ds.getRepository(Recipe);

    let recipe = await recipeRepo.findOne({where: {id: parseInt(id)} });

    if (!recipe) {
        res.status(404).end("Recipe not found");
        return;
    }

    const session = await getServerSession(req, res, authOptions);

    if (req.method === "GET") {
        if (!recipe.public) {
            if (!session) {
                res.status(400).end("Unauthenticated");
                return;
            } else if (!recipe.public && recipe.creatorId !== session.user.id) {
                res.status(403).end("Unauthorized");
                return;
            }
        }

        res.status(200).json(recipe);
    } else if (req.method === "PATCH") {
        if (!session) {
            res.status(400).end("Unauthenticated");
            return;
        } else if (recipe.creatorId !== session.user.id) {
            res.status(403).end("Unauthorized");
            return;
        }

        const patchInput = PatchBodySchema.safeParse(req.body);
        
        if (!patchInput.success) {
            res.status(400).send("Invalid Input Data");
            return;
        }

        recipe = recipeRepo.merge(recipe, patchInput.data);
        await recipeRepo.save(recipe);

        res.status(200).json(recipe);
    } else if (req.method === "DELETE") {
        if (!session) {
            res.status(400).end("Unauthenticated");
            return;
        } else if (recipe.creatorId !== session.user.id) {
            res.status(403).end("Unauthorized");
            return;
        }

        await recipeRepo.delete(recipe);
        res.status(200).json(recipe);
    } else {
        res.status(405).end("Method Not Allowed");
    }
}
