import type {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";

import {ReadyDataSource} from "@/data-source";

import {MealPlanDay} from "../../../entities/meal-plan-day.entity";
import {authOptions} from "../auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MealPlanDay[] | string>,
): Promise<void> {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user) {
        res.status(400).end("Unauthenticated");
        return;
    }
        
    const ds = await ReadyDataSource();
    const mdpRepo = ds.getRepository(MealPlanDay);

    if (req.method === "GET") {
        const allMPDs = await mdpRepo.find({where: {userId: session.user.id}, relations: {recipe: true} });

        res.status(200).json(allMPDs);
    } else if (req.method === "DELETE") {
        const allMPDs = await mdpRepo.find({where: {userId: session.user.id} });
        await mdpRepo.delete(allMPDs.map(mpd => mpd.id));

        res.status(200).json([]);
    } else {
        res.status(405).send("Method Not Allowed");
    }
}
