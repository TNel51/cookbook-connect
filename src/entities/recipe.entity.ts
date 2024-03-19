import {
    Column, Entity, JoinTable, ManyToMany, ManyToOne,
    OneToMany,
} from "typeorm";

import {BaseEntity} from "./base-entity";
import {Rating} from "./rating.entity";
import {RecipeIngredient} from "./recipe-ingredient.entity";
import {Tag} from "./tag.entity";
import {User} from "./user.entity";

@Entity()
export class Recipe extends BaseEntity {
    @ManyToOne(() => User)
    creator: User;

    @Column()
    creatorId: number;

    @Column()
    public: boolean;

    @Column()
    title: string;

    @Column()
    category: string;

    @Column()
    difficulty: string;

    @Column()
    instructions: string;

    @Column()
    time: string;

    @ManyToMany(() => Tag, t => t.recipes)
    @JoinTable()
    tags: Tag[];

    @OneToMany(() => Rating, r => r.recipe)
    ratings: Rating[];

    @OneToMany(() => RecipeIngredient, ri => ri.recipe)
    ingredients: RecipeIngredient[];
}
