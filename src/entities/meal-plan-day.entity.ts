import {
    Column,
    Entity,
    ManyToOne,
    type Relation,
    Unique,
} from "typeorm";

import {BaseEntity} from "./base-entity";
import {Recipe} from "./recipe.entity";
import {User} from "./user.entity";

export enum DayOfWeek {
    Sunday = "Sunday",
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
}

export enum MealType {
    Breakfast = "Breakfast",
    Lunch = "Lunch",
    Dinner = "Dinner",
}

@Entity("meal_plan_day")
@Unique(["user", "recipe", "day"])
export class MealPlanDay extends BaseEntity {
    @ManyToOne(() => User)
    user: Relation<User>;

    @Column()
    userId: number;
    
    @ManyToOne(() => Recipe)
    recipe: Relation<Recipe>;

    @Column()
    recipeId: number;

    @Column({type: "enum", enum: DayOfWeek})
    day: DayOfWeek;

    @Column({type: "enum", enum: MealType})
    type: MealType;
}
