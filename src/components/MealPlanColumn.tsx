import React from "react";

const MealSlot = ({mealType, mealContent}) => (
    <div className="flex-1 flex flex-col justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded min-h-[80px]"> {/* flex-1 will make the slot grow to fill the space */}
        <span className="text-sm font-semibold text-gray-700 dark:text-white">{mealType}</span>
        <span className="text-gray-500 dark:text-white text-xs mt-1">{mealContent}</span>
    </div>
);

const DayColumn = ({day, meals}) => (
    <div className="flex flex-col flex-grow min-w-0 break-words bg-white rounded shadow-lg m-2 h-full min-h-[500px] min-w-[125px] dark:bg-gray-800">
        <div className="flex flex-col h-full py-5">
            <h3 className="text-lg font-bold text-center text-gray-800 mb-4 dark:text-white">{day}</h3>
            <div className="flex flex-col flex-grow space-y-12"> {/* space-y-4 adds space between meal slots */}
                <MealSlot mealType="Breakfast" mealContent={meals.breakfast} />
                <MealSlot mealType="Lunch" mealContent={meals.lunch} />
                <MealSlot mealType="Dinner" mealContent={meals.dinner} />
            </div>
            
        </div>
    </div>
);
  
export default DayColumn;
  
