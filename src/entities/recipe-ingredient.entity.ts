import {
    Column, Entity, ManyToOne,
    Relation,
} from "typeorm";

import {BaseEntity} from "./base-entity";
import {Ingredient} from "./ingredient.entity";
import {Recipe} from "./recipe.entity";

@Entity()
export class RecipeIngredient extends BaseEntity {
    @ManyToOne(() => Recipe)
    recipe: Relation<Recipe>;

    @Column()
    recipeId: number;

    @ManyToOne(() => Ingredient)
    ingredient: Relation<Ingredient>;

    @Column()
    ingredientId: number;

    @Column()
    quantity: number;

    @Column()
    required: boolean;
}
