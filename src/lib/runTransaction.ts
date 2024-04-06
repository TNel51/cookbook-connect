import type {EntityManager} from "typeorm";

import {ReadyDataSource} from "../data-source";

export async function runTransaction<T>(func: (em: EntityManager) => Promise<T>): Promise<T> {
    const ds = await ReadyDataSource();
    const queryRunner = ds.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let res: T;

    try {
        res = await func(queryRunner.manager);

        await queryRunner.commitTransaction();
    } catch (e) {
        await queryRunner.rollbackTransaction();

        throw e;
    } finally {
        await queryRunner.release();
    }

    return res;
}
