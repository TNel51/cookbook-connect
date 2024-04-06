import { MigrationInterface, QueryRunner } from "typeorm";

export class Automigration1712429207719 implements MigrationInterface {
    name = 'Automigration1712429207719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP COLUMN "unit"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD "quantity" character varying NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."recipe_category_enum" RENAME TO "recipe_category_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."recipe_category_enum" AS ENUM('Snack', 'Appetizer', 'Meal', 'Dessert', 'Side')`);
        await queryRunner.query(`ALTER TABLE "recipe" ALTER COLUMN "category" TYPE "public"."recipe_category_enum" USING "category"::"text"::"public"."recipe_category_enum"`);
        await queryRunner.query(`DROP TYPE "public"."recipe_category_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."recipe_category_enum_old" AS ENUM('Snack', 'Appetizer', 'Meal', 'Dessert')`);
        await queryRunner.query(`ALTER TABLE "recipe" ALTER COLUMN "category" TYPE "public"."recipe_category_enum_old" USING "category"::"text"::"public"."recipe_category_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."recipe_category_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."recipe_category_enum_old" RENAME TO "recipe_category_enum"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD "quantity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD "unit" character varying`);
    }

}
