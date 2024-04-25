import {
    Column,
    Entity,
    ManyToOne,
    type Relation,
    Unique,
} from "typeorm";

import {BaseEntity} from "./base-entity";
import {Ingredient} from "./ingredient.entity";
import {Recipe} from "./recipe.entity";

@Entity("recipe_ingredient")
@Unique(["recipe", "ingredient"])
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
    quantity: string;

    @Column()
    required: boolean;
}
