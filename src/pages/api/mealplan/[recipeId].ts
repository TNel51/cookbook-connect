import type {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {z} from "zod";

import {ReadyDataSource} from "@/data-source";

import {
    DayOfWeek, MealPlanDay, MealType,
} from "../../../entities/meal-plan-day.entity";
import {authOptions} from "../auth/[...nextauth]";

const PutBodySchema = z.object({
    day: z.nativeEnum(DayOfWeek),
    type: z.nativeEnum(MealType),
}).strict();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MealPlanDay | string>,
): Promise<void> {
    const {recipeId} = req.query;

    if (!recipeId || Array.isArray(recipeId)) {
        res.status(500).send("Failed to find Id");
        return;
    }
    
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user) {
        res.status(400).end("Unauthenticated");
        return;
    }

    const putInput = PutBodySchema.safeParse(req.body);
        
    if (!putInput.success) {
        res.status(400).send("Invalid Input Data");
        return;
    }
        
    const ds = await ReadyDataSource();
    const mdpRepo = ds.getRepository(MealPlanDay);

    if (req.method === "PUT") {
        const mpd = mdpRepo.create({
            userId: session.user.id,
            recipeId: parseInt(recipeId),
            day: putInput.data.day,
            type: putInput.data.type,
        });
        await mdpRepo.save(mpd);

        res.status(200).json(mpd);
    } else {
        res.status(405).send("Method Not Allowed");
    }
}
