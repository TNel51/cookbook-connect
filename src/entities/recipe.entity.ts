import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    type Relation,
    VirtualColumn,
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

    @Column()
    description: string;

    @Column({type: "enum", enum: RecipeCategory})
    category: RecipeCategory;

    @Column({type: "enum", enum: RecipeDifficulty})
    difficulty: RecipeDifficulty;

    @Column()
    instructions: string;

    @Column()
    time: string;

    @Column()
    imageUrl: string;

    @VirtualColumn({
        query: alias => `SELECT COALESCE(AVG("rating"."numStars"), 0) FROM "rating" WHERE "recipeId"=${alias}.id`,
        type: "float",
        transformer: {
            to() {
                return;
            },
            from(value: string) {
                return parseFloat(value);
            },
        },
    })
    numStars: number;

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
