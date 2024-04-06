import {
    Column, Entity, ManyToMany, ManyToOne, Relation,
} from "typeorm";

import {BaseEntity} from "./base-entity";
import {Recipe} from "./recipe.entity";
import {User} from "./user.entity";

@Entity()
export class Tool extends BaseEntity {
    @ManyToOne(() => User)
    creator: Relation<User>;

    @Column()
    creatorId: number;

    @Column({unique: true})
    text: string;

    @ManyToMany(() => Recipe, r => r.tools)
    recipes: Relation<Recipe[]>;
}
