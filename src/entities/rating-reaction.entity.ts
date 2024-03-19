import {
    Column, Entity, ManyToOne,
} from "typeorm";

import {BaseEntity} from "./base-entity";
import {Rating} from "./rating.entity";
import {User} from "./user.entity";

@Entity()
export class RatingReaction extends BaseEntity {
    @ManyToOne(() => Rating)
    rating: Rating;

    @Column()
    ratingId: number;

    @ManyToOne(() => User)
    user: User;

    @Column()
    name: string;

    @Column()
    liked: true;
}
