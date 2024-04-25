import Link from "next/link";
import type {ReactElement} from "react";

import type {MealType} from "../entities/meal-plan-day.entity";
import type {Recipe} from "../entities/recipe.entity";

export default function MealPlanSlot({mealType, meals}: {mealType: MealType; meals: Recipe[];}): ReactElement {
    return <div className="flex-1 flex flex-col justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded min-h-[80px]">
        <span className="text-sm font-semibold text-gray-700 dark:text-white">{mealType}</span>
        <div className="text-gray-500 dark:text-white text-xs">{meals.map(m => <div key={m.id}>
            <Link href={`/recipes/${m.id}`}>{m.title}</Link>
        </div>)}
        </div>
    </div>;
}
