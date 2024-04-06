import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    Relation,
} from "typeorm";

import {BaseEntity} from "./base-entity";
import {Rating} from "./rating.entity";
import {RecipeIngredient} from "./recipe-ingredient.entity";
import {Tag} from "./tag.entity";
import {Tool} from "./tool.entity";
import {User} from "./user.entity";

export enum RecipeDifficulty {
    Easy = "Easy",
    Medium = "Medium",
    Difficult = "Difficult",
}

export enum RecipeCategory {
    Snack = "Snack",
    Appetizer = "Appetizer",
    Meal = "Meal",
    Dessert = "Dessert",
    Side = "Side",
}

@Entity("recipe")
export class Recipe extends BaseEntity {
    @ManyToOne(() => User)
    creator: Relation<User>;

    @Column()
    creatorId: number;

    @Column()
    public: boolean;

    @Column()
    title: string;

    @Column({type: "enum", enum: RecipeCategory})
    category: RecipeCategory;

    @Column({type: "enum", enum: RecipeDifficulty})
    difficulty: RecipeDifficulty;

    @Column()
    instructions: string;

    @Column()
    time: string;

    @ManyToMany(() => Tag, t => t.recipes)
    @JoinTable()
    tags: Relation<Tag[]>;

    @ManyToMany(() => Tool, t => t.recipes)
    @JoinTable()
    tools: Relation<Tool[]>;

    @OneToMany(() => Rating, r => r.recipe)
    ratings: Relation<Rating[]>;

    @OneToMany(() => RecipeIngredient, ri => ri.recipe)
    ingredients: Relation<RecipeIngredient[]>;
}
