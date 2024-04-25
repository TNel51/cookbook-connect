import { MigrationInterface, QueryRunner } from "typeorm";

export class Automigration1714072431355 implements MigrationInterface {
    name = 'Automigration1714072431355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "recipeingredient_reciid_ingrid"`);
        await queryRunner.query(`CREATE TYPE "public"."meal_plan_day_day_enum" AS ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')`);
        await queryRunner.query(`CREATE TYPE "public"."meal_plan_day_type_enum" AS ENUM('Breakfast', 'Lunch', 'Dinner')`);
        await queryRunner.query(`CREATE TABLE "meal_plan_day" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer NOT NULL, "recipeId" integer NOT NULL, "day" "public"."meal_plan_day_day_enum" NOT NULL, "type" "public"."meal_plan_day_type_enum" NOT NULL, CONSTRAINT "UQ_d7d311adbfabfc85e615928da05" UNIQUE ("userId", "recipeId", "day"), CONSTRAINT "PK_d76b6e2777af8298428548c9f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "UQ_e7fa06a17091cf908412dff558b" UNIQUE ("recipeId", "ingredientId")`);
        await queryRunner.query(`ALTER TABLE "meal_plan_day" ADD CONSTRAINT "FK_bb433124cf85c0ee6440dc9484f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal_plan_day" ADD CONSTRAINT "FK_72b89c79fd6d36019bc844c548d" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal_plan_day" DROP CONSTRAINT "FK_72b89c79fd6d36019bc844c548d"`);
        await queryRunner.query(`ALTER TABLE "meal_plan_day" DROP CONSTRAINT "FK_bb433124cf85c0ee6440dc9484f"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "UQ_e7fa06a17091cf908412dff558b"`);
        await queryRunner.query(`DROP TABLE "meal_plan_day"`);
        await queryRunner.query(`DROP TYPE "public"."meal_plan_day_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."meal_plan_day_day_enum"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipeingredient_reciid_ingrid" UNIQUE ("recipeId", "ingredientId")`);
    }

}
