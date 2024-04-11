import type {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {type EntityManager, In} from "typeorm";
import {z} from "zod";

import {ReadyDataSource} from "@/data-source";
import {
    Recipe, RecipeCategory, RecipeDifficulty,
} from "@/entities/recipe.entity";
import {runTransaction} from "@/lib/runTransaction";

import {RecipeIngredient} from "../../../entities/recipe-ingredient.entity";
import {Tag} from "../../../entities/tag.entity";
import {Tool} from "../../../entities/tool.entity";
import {includeAll} from "../../../lib/includeAll";
import {authOptions} from "../auth/[...nextauth]";

const GetQuerySchema = z.object({
    mine: z.enum(["true", "false"]).optional(),
    take: z.string(),
    skip: z.string(),
    category: z.nativeEnum(RecipeCategory).optional(),
    difficulty: z.nativeEnum(RecipeDifficulty).optional(),
}).strict()
    .transform(({
        mine, take, skip, category, difficulty,
    }) => ({
        mine: mine === "true",
        take: parseInt(take),
        skip: parseInt(skip),
        category: category,
        difficulty: difficulty,
    }));

const PostBodySchema = z.object({
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
}).strict();

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

        if (getInput.data.mine) {
            const session = await getServerSession(req, res, authOptions);

            if (!session?.user) {
                res.status(400).end("Unauthenticated");
                return;
            }
        
            const [recipes, totalRecipes] = await recipeRepo.findAndCount({
                take: getInput.data.take,
                skip: getInput.data.skip,
                where: {
                    creatorId: session.user.id,
                    category: getInput.data.category,
                    difficulty: getInput.data.difficulty,
                },
                relations: {
                    creator: true,
                    tags: true,
                    ingredients: true,
                    tools: true,
                },
                select: includeAll(recipeRepo),
            });
    
            res.status(200).json({total: totalRecipes, recipes: recipes});
        } else {
            const [recipes, totalRecipes] = await recipeRepo.findAndCount({
                take: getInput.data.take,
                skip: getInput.data.skip,
                where: {
                    public: true,
                },
                relations: {
                    creator: true,
                    tags: true,
                    ingredients: true,
                    tools: true,
                },
                select: includeAll(recipeRepo),
            });
    
            res.status(200).json({total: totalRecipes, recipes: recipes});
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

        const newRecipe = await runTransaction(async (em: EntityManager) => {
            const recipe = em.create(Recipe, {
                creatorId: session.user.id,
                public: postInput.data.public,
                title: postInput.data.title,
                description: postInput.data.description,
                category: postInput.data.category,
                difficulty: postInput.data.difficulty,
                instructions: postInput.data.instructions,
                time: postInput.data.time,
            });

            await em.insert(Recipe, recipe);

            const tags = await em.find(Tag, {where: {id: In(postInput.data.tags)} });
            recipe.tags = tags;

            const tools = await em.find(Tool, {where: {id: In(postInput.data.tools)} });
            recipe.tools = tools;

            await em.save(Recipe, recipe);

            for (const ingredient of postInput.data.ingredients) {
                const recipeIngredient = em.create(RecipeIngredient, ingredient);
                recipeIngredient.recipe = recipe;

                await em.insert(RecipeIngredient, recipeIngredient);
            }

            return recipe;
        });

        res.status(200).json(newRecipe);
    } else {
        res.status(405).send("Method Not Allowed");
    }
}
