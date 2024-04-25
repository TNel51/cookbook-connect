import { MigrationInterface, QueryRunner } from "typeorm";

export class Automigration1714070754103 implements MigrationInterface {
    name = 'Automigration1714070754103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipeingredient_reciid_ingrid" UNIQUE ("recipeId", "ingredientId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "recipeingredient_reciid_ingrid"`);
    }

}
