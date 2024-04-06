import { MigrationInterface, QueryRunner } from "typeorm";

export class Automigration1712105764377 implements MigrationInterface {
    name = 'Automigration1712105764377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating_reaction" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "UQ_a128deb30979b06c8bba38cccd4"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "unit"`);
        await queryRunner.query(`ALTER TABLE "tool" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD "unit" character varying`);
        await queryRunner.query(`ALTER TABLE "rating_reaction" DROP CONSTRAINT "FK_78a12d10500e7e278a39bd094c9"`);
        await queryRunner.query(`ALTER TABLE "rating_reaction" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "UQ_693e7394d4d20a51864417b3e32" UNIQUE ("text")`);
        await queryRunner.query(`ALTER TABLE "tool" ADD CONSTRAINT "UQ_d6c2d0e1690b4ee61e4dfd56249" UNIQUE ("text")`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "category"`);
        await queryRunner.query(`CREATE TYPE "public"."recipe_category_enum" AS ENUM('Snack', 'Appetizer', 'Meal', 'Dessert')`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "category" "public"."recipe_category_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "UQ_f6e34944586de27ae18cb1990be" UNIQUE ("code")`);
        await queryRunner.query(`ALTER TABLE "rating_reaction" ADD CONSTRAINT "FK_78a12d10500e7e278a39bd094c9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating_reaction" DROP CONSTRAINT "FK_78a12d10500e7e278a39bd094c9"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "UQ_f6e34944586de27ae18cb1990be"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "category"`);
        await queryRunner.query(`DROP TYPE "public"."recipe_category_enum"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "category" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tool" DROP CONSTRAINT "UQ_d6c2d0e1690b4ee61e4dfd56249"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "UQ_693e7394d4d20a51864417b3e32"`);
        await queryRunner.query(`ALTER TABLE "rating_reaction" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rating_reaction" ADD CONSTRAINT "FK_78a12d10500e7e278a39bd094c9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP COLUMN "unit"`);
        await queryRunner.query(`ALTER TABLE "tool" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "unit" character varying`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "UQ_a128deb30979b06c8bba38cccd4" UNIQUE ("code")`);
        await queryRunner.query(`ALTER TABLE "rating_reaction" ADD "name" character varying NOT NULL`);
    }

}
