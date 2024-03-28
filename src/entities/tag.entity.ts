import {
    Column, Entity, ManyToMany, ManyToOne,
    Relation,
} from "typeorm";

import {BaseEntity} from "./base-entity";
import {Recipe} from "./recipe.entity";
import {User} from "./user.entity";

@Entity()
export class Tag extends BaseEntity {
    @ManyToOne(() => User)
    creator: Relation<User>;

    @Column()
    creatorId: number;

    @Column()
    code: string;

    @ManyToMany(() => Recipe, r => r.tags)
    recipes: Relation<Recipe[]>;
}
