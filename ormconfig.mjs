import config from "config";
import {DataSource} from "typeorm";

export default new DataSource({
    type: "postgres",
    host: config.get("database.host"),
    port: config.get("database.port"),
    username: config.get("database.username"),
    password: config.get("database.password"),
    database: config.get("database.database"),
    schema: "public",
    entities: ["src/entities/**/*.entity.ts"],
    migrationsTableName: "migrations",
    migrations: ["migrations/*.ts"],
});
