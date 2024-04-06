import {
    Column, Entity, ManyToOne,
    OneToMany,
    Relation,
} from "typeorm";

import {BaseEntity} from "./base-entity";
import {RatingReaction} from "./rating-reaction.entity";
import {Recipe} from "./recipe.entity";
import {User} from "./user.entity";

@Entity("rating")
export class Rating extends BaseEntity {
    @ManyToOne(() => Recipe)
    recipe: Relation<Recipe>;

    @Column()
    recipeId: number;

    @ManyToOne(() => User)
    user: Relation<User>;

    @Column()
    userId: number;

    @Column({type: "int"})
    numStars: number;

    @Column({nullable: true})
    comment?: string;

    @OneToMany(() => RatingReaction, rr => rr.rating)
    reactions: Relation<RatingReaction[]>;
}
