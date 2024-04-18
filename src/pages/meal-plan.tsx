import type {ReactElement} from "react";

import DayColumn from "../components/MealPlanColumn";

const MealPlan = (): ReactElement => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const mealContent = {
        breakfast: "Tomato Soup",
        lunch: "Tomato Soup",
        dinner: "Tomato Soup",
    };

    return (
        <div className="container mx-auto mt-10">
            {/* Header Section */}
            <div className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Meal Planning
            </div>
            <div className="container mx-auto mt-10">
                <div className="flex flex-wrap justify-between">
                    {daysOfWeek.map(day => (
                        <DayColumn key={day} day={day} meals={mealContent} />
                    ))}
                </div>
                <div className="mt-6 flex justify-end space-x-4"> {/* Container for buttons */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Export Shopping List
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Export Week
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MealPlan;
