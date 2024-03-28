import { MigrationInterface, QueryRunner } from "typeorm";

export class Automigration1711476245483 implements MigrationInterface {
    name = 'Automigration1711476245483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "unit" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER COLUMN "unit" SET NOT NULL`);
    }

}
