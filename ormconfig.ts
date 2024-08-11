import config from "config";
import {DataSource as ORMDataSource} from "typeorm";

export const DataSource = new ORMDataSource({
    type: "postgres",
    host: config.get("database.host"),
    port: config.get("database.port"),
    username: config.get("database.username"),
    password: config.get("database.password"),
    database: config.get("database.name"),
    schema: "public",
    entities: ["src/**/*.entity.ts"],
    migrationsTableName: "migrations",
    migrations: ["migrations/*.ts"],
});
