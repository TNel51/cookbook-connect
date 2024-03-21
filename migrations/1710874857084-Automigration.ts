import { MigrationInterface, QueryRunner } from "typeorm";

export class Automigration1710874857084 implements MigrationInterface {
    name = 'Automigration1710874857084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rating_reaction" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "ratingId" integer NOT NULL, "name" character varying NOT NULL, "liked" boolean NOT NULL, "userId" integer, CONSTRAINT "PK_f25512dbabe26575a95f1b7d6bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "recipeId" integer NOT NULL, "userId" integer NOT NULL, "numStars" integer NOT NULL, "comment" character varying, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "creatorId" integer NOT NULL, "code" character varying NOT NULL, "text" character varying NOT NULL, "unit" character varying NOT NULL, CONSTRAINT "UQ_a128deb30979b06c8bba38cccd4" UNIQUE ("code"), CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_ingredient" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "recipeId" integer NOT NULL, "ingredientId" integer NOT NULL, "quantity" integer NOT NULL, "required" boolean NOT NULL, CONSTRAINT "PK_a13ac3f2cebdd703ac557c5377c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "creatorId" integer NOT NULL, "public" boolean NOT NULL, "title" character varying NOT NULL, "category" character varying NOT NULL, "difficulty" character varying NOT NULL, "instructions" character varying NOT NULL, "time" character varying NOT NULL, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "creatorId" integer NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_tags_tag" ("recipeId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_ae13f8c3cba4e537ac79e71d39f" PRIMARY KEY ("recipeId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ec10fc71f95d0199fa20bc3657" ON "recipe_tags_tag" ("recipeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ee885d85e317449e0f990504e8" ON "recipe_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "rating_reaction" ADD CONSTRAINT "FK_2910eb907b85232a64287542244" FOREIGN KEY ("ratingId") REFERENCES "rating"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating_reaction" ADD CONSTRAINT "FK_78a12d10500e7e278a39bd094c9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_52e568d130cc658fc17c9dd00ff" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_e6cb2c0ff7b045e269bef26516c" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "FK_1ad3257a7350c39854071fba211" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "FK_2879f9317daa26218b5915147e7" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_6607bb9fec7358e5209b5c30bf1" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_07caa6f5e5a4ebf9a46c65669eb" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_tags_tag" ADD CONSTRAINT "FK_ec10fc71f95d0199fa20bc3657a" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "recipe_tags_tag" ADD CONSTRAINT "FK_ee885d85e317449e0f990504e8f" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_tags_tag" DROP CONSTRAINT "FK_ee885d85e317449e0f990504e8f"`);
        await queryRunner.query(`ALTER TABLE "recipe_tags_tag" DROP CONSTRAINT "FK_ec10fc71f95d0199fa20bc3657a"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_07caa6f5e5a4ebf9a46c65669eb"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_6607bb9fec7358e5209b5c30bf1"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "FK_2879f9317daa26218b5915147e7"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "FK_1ad3257a7350c39854071fba211"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_e6cb2c0ff7b045e269bef26516c"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_52e568d130cc658fc17c9dd00ff"`);
        await queryRunner.query(`ALTER TABLE "rating_reaction" DROP CONSTRAINT "FK_78a12d10500e7e278a39bd094c9"`);
        await queryRunner.query(`ALTER TABLE "rating_reaction" DROP CONSTRAINT "FK_2910eb907b85232a64287542244"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ee885d85e317449e0f990504e8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ec10fc71f95d0199fa20bc3657"`);
        await queryRunner.query(`DROP TABLE "recipe_tags_tag"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
        await queryRunner.query(`DROP TABLE "recipe_ingredient"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`DROP TABLE "rating_reaction"`);
    }

}
