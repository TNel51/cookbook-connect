import { MigrationInterface, QueryRunner } from "typeorm";

export class Automigration1711047962374 implements MigrationInterface {
    name = 'Automigration1711047962374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "difficulty"`);
        await queryRunner.query(`CREATE TYPE "public"."recipe_difficulty_enum" AS ENUM('Easy', 'Medium', 'Difficult')`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "difficulty" "public"."recipe_difficulty_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "difficulty"`);
        await queryRunner.query(`DROP TYPE "public"."recipe_difficulty_enum"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "difficulty" character varying NOT NULL`);
    }

}
