import {
    Column, Entity, ManyToOne,
    OneToMany,
} from "typeorm";

import {BaseEntity} from "./base-entity";
import {RecipeIngredient} from "./recipe-ingredient.entity";
import {User} from "./user.entity";

@Entity()
export class Ingredient extends BaseEntity {
    @ManyToOne(() => User)
    creator: User;

    @Column()
    creatorId: number;

    @Column({unique: true})
    code: string;

    @Column()
    text: string;

    @Column()
    unit: string;

    @OneToMany(() => RecipeIngredient, ri => ri.ingredient)
    recipes: RecipeIngredient[];
}
