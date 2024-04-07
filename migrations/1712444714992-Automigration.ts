import { MigrationInterface, QueryRunner } from "typeorm";

export class Automigration1712444714992 implements MigrationInterface {
    name = 'Automigration1712444714992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ADD "description" character varying NOT NULL DEFAULT 'None'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "description"`);
    }

}
