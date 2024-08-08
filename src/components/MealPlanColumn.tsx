import type {ReactElement} from "react";
import React from "react";

import type {DayOfWeek, MealPlanDay} from "../entities/meal-plan-day.entity";
import {MealType} from "../entities/meal-plan-day.entity";
import MealPlanSlot from "./MealPlanSlot";

export default function MealPlanColumn({day, meals}: {day: DayOfWeek; meals: MealPlanDay[];}): ReactElement {
    return <div className="flex flex-col break-words bg-white rounded shadow-lg m-2 min-w-[125px] dark:bg-gray-900">
        <div className="flex flex-col h-full px-1 py-5">
            <h3 className="text-lg font-bold text-center text-gray-800 mb-4 dark:text-white">{day}</h3>
            <div className="flex flex-col flex-grow space-y-4">
                <MealPlanSlot mealType={MealType.Breakfast} meals={meals.filter(m => m.type === MealType.Breakfast).map(m => m.recipe)} />
                <MealPlanSlot mealType={MealType.Lunch} meals={meals.filter(m => m.type === MealType.Lunch).map(m => m.recipe)} />
                <MealPlanSlot mealType={MealType.Dinner} meals={meals.filter(m => m.type === MealType.Dinner).map(m => m.recipe)} />
            </div>
        </div>
    </div>;
}
