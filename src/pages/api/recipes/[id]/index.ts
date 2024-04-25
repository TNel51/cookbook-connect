import type {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import type {EntityManager} from "typeorm";
import {In} from "typeorm";
import {z} from "zod";

import {ReadyDataSource} from "@/data-source";
import {
    Recipe, RecipeCategory, RecipeDifficulty,
} from "@/entities/recipe.entity";

import {RecipeIngredient} from "../../../../entities/recipe-ingredient.entity";
import {Tag} from "../../../../entities/tag.entity";
import {Tool} from "../../../../entities/tool.entity";
import {includeAll} from "../../../../lib/includeAll";
import {runTransaction} from "../../../../lib/runTransaction";
import {authOptions} from "../../auth/[...nextauth]";

const PatchBodySchema = z.object({
    public: z.boolean(),
    title: z.string(),
    description: z.string(),
    category: z.nativeEnum(RecipeCategory),
    difficulty: z.nativeEnum(RecipeDifficulty),
    instructions: z.string(),
    time: z.string(),
    tags: z.array(z.number()),
    tools: z.array(z.number()),
    ingredients: z.array(z.object({
        ingredientId: z.number(),
        quantity: z.string(),
        required: z.boolean(),
    })),
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

    let recipe = await recipeRepo.findOne({
        where: {id: parseInt(id)},
        relations: {
            creator: true,
            tags: true,
            ingredients: {
                ingredient: true,
            },
            tools: true,
            ratings: {
                user: true,
            },
        },
        select: includeAll(recipeRepo),
    });

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

        const updatedRecipe = await runTransaction(async (em: EntityManager) => {
            recipe = recipeRepo.merge(recipe!, {
                public: patchInput.data.public,
                title: patchInput.data.title,
                description: patchInput.data.description,
                category: patchInput.data.category,
                difficulty: patchInput.data.difficulty,
                instructions: patchInput.data.instructions,
                time: patchInput.data.time,
            });
    
            if (patchInput.data.tags) {
                const tags = await em.find(Tag, {where: {id: In(patchInput.data.tags)} });
                recipe.tags = tags;
            }
    
            if (patchInput.data.tools) {
                const tools = await em.find(Tool, {where: {id: In(patchInput.data.tools)} });
                recipe.tools = tools;
            }
    
            if (patchInput.data.ingredients) {
                await Promise.all(recipe.ingredients
                    .filter(ingr => !patchInput.data.ingredients!.some(pii => pii.ingredientId === ingr.ingredientId))
                    .map(async ingr => em.delete(RecipeIngredient, ingr.id)));
                    
                for (const ingredient of patchInput.data.ingredients) {
                    const recipeIngredient = em.create(RecipeIngredient, ingredient);
                    recipeIngredient.recipe = recipe;
    
                    await em.upsert(RecipeIngredient, recipeIngredient, {
                        conflictPaths: {
                            recipeId: true,
                            ingredientId: true,
                        },
                    });
                }
            }
    
            await recipeRepo.save(recipe);

            return recipe;
        });

        res.status(200).json(updatedRecipe);
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
