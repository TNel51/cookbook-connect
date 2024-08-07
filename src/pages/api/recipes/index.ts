import type {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {type EntityManager, In} from "typeorm";
import {z} from "zod";
import AWS from 'aws-sdk';

import {ReadyDataSource, similarityBuilder} from "@/data-source";
import {
    Recipe, RecipeCategory, RecipeDifficulty,
} from "@/entities/recipe.entity";
import {runTransaction} from "@/lib/runTransaction";

import {RecipeIngredient} from "../../../entities/recipe-ingredient.entity";
import {Tag} from "../../../entities/tag.entity";
import {Tool} from "../../../entities/tool.entity";
import {includeAll} from "../../../lib/includeAll";
import {authOptions} from "../auth/[...nextauth]";

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Function to generate pre-signed URL
export const getSignedUrl = (key: string): Promise<string> => {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME as string,
      Key: key,
      Expires: 60 * 5, // URL expires in 5 minutes
    };
  
    return new Promise((resolve, reject) => {
      s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    });
  };

const GetQuerySchema = z.object({
    mine: z.enum(["true", "false"]).optional(),
    take: z.string(),
    skip: z.string(),
    key: z.string().optional(),
    category: z.nativeEnum(RecipeCategory).optional(),
    difficulty: z.nativeEnum(RecipeDifficulty).optional(),
}).strict()
    .transform(({
        mine, take, skip, key, category, difficulty,
    }) => ({
        mine: mine === "true",
        take: parseInt(take),
        skip: parseInt(skip),
        key: key,
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
    imageUrl: z.string(),
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

        let recipes: Recipe[];
        let totalRecipes: number;

        if (getInput.data.mine) {
            const session = await getServerSession(req, res, authOptions);

            if (!session?.user) {
                res.status(400).end("Unauthenticated");
                return;
            }
        
            [recipes, totalRecipes] = await recipeRepo.findAndCount({
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
        } else if (getInput.data.key) {
            const recipesBuilder = await similarityBuilder(Recipe, getInput.data.key, "title", 0.2, 10);
            recipesBuilder.orWhere(`${Recipe.constructor.name}.title ILIKE :query`, {query: `%${getInput.data.key.toLowerCase()}%`});
            recipesBuilder.andWhere(`${Recipe.constructor.name}.public=true`);
            if (getInput.data.category) recipesBuilder.andWhere(`${Recipe.constructor.name}.category = :category`, {category: getInput.data.category});
            if (getInput.data.difficulty) recipesBuilder.andWhere(`${Recipe.constructor.name}.difficulty = :difficulty`, {difficulty: getInput.data.difficulty});
            recipesBuilder.leftJoinAndSelect(`${Recipe.constructor.name}.creator`, "creator");
            recipesBuilder.leftJoinAndSelect(`${Recipe.constructor.name}.tags`, "tags");
            recipesBuilder.leftJoinAndSelect(`${Recipe.constructor.name}.ingredients`, "ingredients");
            recipesBuilder.leftJoinAndSelect(`${Recipe.constructor.name}.tools`, "tools");
            
            [recipes, totalRecipes] = await recipesBuilder.getManyAndCount();
        } else {
            [recipes, totalRecipes] = await recipeRepo.findAndCount({
                take: getInput.data.take,
                skip: getInput.data.skip,
                where: {
                    public: true,
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
        }

        // Generate pre-signed URLs for all recipes
        for (const recipe of recipes) {
            if (recipe.imageUrl) {
                const key = recipe.imageUrl.split('/').pop();
                recipe.imageUrl = await getSignedUrl(key);
            }
        }

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
                imageUrl: postInput.data.imageUrl,
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