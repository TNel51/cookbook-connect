import {
    Column, Entity, ManyToOne,
    OneToMany,
} from "typeorm";

import {BaseEntity} from "./base-entity";
import {RatingReaction} from "./rating-reaction.entity";
import {Recipe} from "./recipe.entity";
import {User} from "./user.entity";

@Entity()
export class Rating extends BaseEntity {
    @ManyToOne(() => Recipe)
    recipe: Recipe;

    @Column()
    recipeId: number;

    @ManyToOne(() => User)
    user: User;

    @Column()
    userId: number;

    @Column({type: "int"})
    numStars: number;

    @Column({nullable: true})
    comment?: string;

    @OneToMany(() => RatingReaction, rr => rr.rating)
    reactions: RatingReaction[];
}
