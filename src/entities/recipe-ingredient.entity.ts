import {
    Column, Entity, ManyToOne,
    Relation,
} from "typeorm";

import {BaseEntity} from "./base-entity";
import {Ingredient} from "./ingredient.entity";
import {Recipe} from "./recipe.entity";

export enum Unit {
    None = "",
    Teaspoon = "tsp.",
    Tablespoon = "tbsp.",
    FluidOunce = "fl oz",
    Cup = "cup",
    Pound = "lb",
    Ounce = "oz",
}

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

    @Column({nullable: true})
    unit?: string;

    @Column()
    required: boolean;
}
