import config from "config";
import type {EntityTarget, SelectQueryBuilder} from "typeorm";
import {DataSource as ORMDataSource} from "typeorm";

import type {BaseEntity} from "./entities/base-entity";
import {User} from "./entities/user.entity";

export const DataSource = new ORMDataSource({
    type: "postgres",
    host: config.get("database.host"),
    port: config.get("database.port"),
    username: config.get("database.username"),
    password: config.get("database.password"),
    database: config.get("database.database"),
    schema: "public",
    entities: [User],
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
