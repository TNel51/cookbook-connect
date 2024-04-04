import { MigrationInterface, QueryRunner } from "typeorm";

export class Automigration1711652633180 implements MigrationInterface {
    name = 'Automigration1711652633180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tool" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "creatorId" integer NOT NULL, "code" character varying NOT NULL, "text" character varying NOT NULL, CONSTRAINT "PK_3bf5b1016a384916073184f99b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_tools_tool" ("recipeId" integer NOT NULL, "toolId" integer NOT NULL, CONSTRAINT "PK_d5941bda822fb867de9a74aea30" PRIMARY KEY ("recipeId", "toolId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b5316a8736339dec32da4f584a" ON "recipe_tools_tool" ("recipeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_333c973855086d884fdc74ff72" ON "recipe_tools_tool" ("toolId") `);
        await queryRunner.query(`ALTER TABLE "tool" ADD CONSTRAINT "FK_a2742ed99476a1313675976ddaa" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_tools_tool" ADD CONSTRAINT "FK_b5316a8736339dec32da4f584a3" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "recipe_tools_tool" ADD CONSTRAINT "FK_333c973855086d884fdc74ff724" FOREIGN KEY ("toolId") REFERENCES "tool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_tools_tool" DROP CONSTRAINT "FK_333c973855086d884fdc74ff724"`);
        await queryRunner.query(`ALTER TABLE "recipe_tools_tool" DROP CONSTRAINT "FK_b5316a8736339dec32da4f584a3"`);
        await queryRunner.query(`ALTER TABLE "tool" DROP CONSTRAINT "FK_a2742ed99476a1313675976ddaa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_333c973855086d884fdc74ff72"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b5316a8736339dec32da4f584a"`);
        await queryRunner.query(`DROP TABLE "recipe_tools_tool"`);
        await queryRunner.query(`DROP TABLE "tool"`);
    }

}
