import "reflect-metadata";

import type {EntityTarget, SelectQueryBuilder} from "typeorm";
import {DataSource as ORMDataSource} from "typeorm";

import type {BaseEntity} from "./entities/base-entity";
import {Ingredient} from "./entities/ingredient.entity";
import {MealPlanDay} from "./entities/meal-plan-day.entity";
import {Rating} from "./entities/rating.entity";
import {RatingReaction} from "./entities/rating-reaction.entity";
import {Recipe} from "./entities/recipe.entity";
import {RecipeIngredient} from "./entities/recipe-ingredient.entity";
import {Tag} from "./entities/tag.entity";
import {Tool} from "./entities/tool.entity";
import {User} from "./entities/user.entity";

if (process.env.DATABASE_HOST === undefined) throw Error("Failed to load DATABASE_HOST env variable");
if (process.env.DATABASE_PORT === undefined) throw Error("Failed to load DATABASE_PORT env variable");
if (process.env.DATABASE_USERNAME === undefined) throw Error("Failed to load DATABASE_USERNAME env variable");
if (process.env.DATABASE_PASSWORD === undefined) throw Error("Failed to load DATABASE_PASSWORD env variable");
if (process.env.DATABASE_NAME === undefined) throw Error("Failed to load DATABASE_DATABASE env variable");

export const DataSource = new ORMDataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    schema: "public",
    entities: [Ingredient, MealPlanDay, RatingReaction, Rating, RecipeIngredient, Recipe, Tag, Tool, User],
});

export async function ReadyDataSource(): Promise<ORMDataSource> {
    if (DataSource.isInitialized) return DataSource;

    await DataSource.initialize();
    return DataSource;
}

export async function similarityBuilder<T extends BaseEntity>(entity: EntityTarget<T>, query: string, field: keyof T, threshold = 0.5, limit = 10): Promise<SelectQueryBuilder<T>> {
    const ds = await ReadyDataSource();
    const repo = ds.getRepository(entity);

    return repo.createQueryBuilder(entity.constructor.name)
        .addSelect(`SIMILARITY(${String(field)}, :query)`, "similarity")
        .where(`SIMILARITY(${String(field)}, :query) > :threshold`, {threshold})
        .setParameter("query", query)
        .orderBy("similarity", "DESC")
        .take(limit < 0 ? undefined : limit);
}

export async function getSimilar<T extends BaseEntity>(entity: EntityTarget<T>, query: string, field: keyof T, threshold?: number, limit?: number): Promise<T[]> {
    const builder = await similarityBuilder(entity, query, field, threshold, limit);
    return builder.getMany();
}
