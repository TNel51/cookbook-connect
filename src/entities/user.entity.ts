import {Column, Entity} from "typeorm";

import {BaseEntity} from "./base-entity";

@Entity("user")
export class User extends BaseEntity {
    @Column({unique: true})
    email: string;

    @Column({select: false})
    password: string;

    @Column()
    displayName: string;

    @Column({nullable: true})
    avatarUrl?: string;
}
