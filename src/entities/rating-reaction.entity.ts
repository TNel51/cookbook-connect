import {
    Column, Entity, ManyToOne,
    Relation,
} from "typeorm";

import {BaseEntity} from "./base-entity";
import {Rating} from "./rating.entity";
import {User} from "./user.entity";

@Entity("rating_reaction")
export class RatingReaction extends BaseEntity {
    @ManyToOne(() => Rating)
    rating: Relation<Rating>;

    @Column()
    ratingId: number;

    @ManyToOne(() => User)
    user: Relation<User>;

    @Column()
    userId: number;

    @Column()
    liked: boolean;
}
