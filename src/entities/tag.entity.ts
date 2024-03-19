import {
    Column, Entity, ManyToMany, ManyToOne,
} from "typeorm";

import {BaseEntity} from "./base-entity";
import {Recipe} from "./recipe.entity";
import {User} from "./user.entity";

@Entity()
export class Tag extends BaseEntity {
    @ManyToOne(() => User)
    creator: User;

    @Column()
    creatorId: number;

    @Column()
    code: string;

    @ManyToMany(() => Recipe, r => r.tags)
    recipes: Recipe[];
}
