import {
    Column, Entity, ManyToOne,
    OneToMany,
    Relation,
} from "typeorm";

import {BaseEntity} from "./base-entity";
import {RecipeIngredient} from "./recipe-ingredient.entity";
import {User} from "./user.entity";

@Entity("ingredient")
export class Ingredient extends BaseEntity {
    @ManyToOne(() => User)
    creator: Relation<User>;

    @Column()
    creatorId: number;

    @Column({unique: true})
    text: string;

    @OneToMany(() => RecipeIngredient, ri => ri.ingredient)
    recipes: Relation<RecipeIngredient[]>;
}
