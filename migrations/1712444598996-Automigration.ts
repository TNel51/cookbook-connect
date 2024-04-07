import { MigrationInterface, QueryRunner } from "typeorm";

export class Automigration1712444598996 implements MigrationInterface {
    name = 'Automigration1712444598996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ADD "description" character varying NOT NULL DEFAULT 'None'`);
        await queryRunner.query(`ALTER TABLE "recipe" ALTER COLUMN "description" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "description"`);
    }

}
