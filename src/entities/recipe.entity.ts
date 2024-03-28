import {
    Column, Entity, JoinTable, ManyToMany, ManyToOne,
    OneToMany,
    Relation,
} from "typeorm";

import {BaseEntity} from "./base-entity";
import {Rating} from "./rating.entity";
import {RecipeIngredient} from "./recipe-ingredient.entity";
import {Tag} from "./tag.entity";
import {User} from "./user.entity";

export enum RecipeDifficulty {
    Easy = "Easy",
    Medium = "Medium",
    Difficult = "Difficult",
}

@Entity()
export class Recipe extends BaseEntity {
    @ManyToOne(() => User)
    creator: Relation<User>;

    @Column()
    creatorId: number;

    @Column()
    public: boolean;

    @Column()
    title: string;

    @Column()
    category: string;

    @Column({type: "enum", enum: RecipeDifficulty})
    difficulty: RecipeDifficulty;

    @Column()
    instructions: string;

    @Column()
    time: string;

    @ManyToMany(() => Tag, t => t.recipes)
    @JoinTable()
    tags: Relation<Tag[]>;

    @OneToMany(() => Rating, r => r.recipe)
    ratings: Relation<Rating[]>;

    @OneToMany(() => RecipeIngredient, ri => ri.recipe)
    ingredients: Relation<RecipeIngredient[]>;
}
