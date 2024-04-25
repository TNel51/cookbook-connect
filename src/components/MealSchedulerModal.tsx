import axios from "axios";
import type {ReactElement} from "react";
import React, {useState} from "react";
import {toast} from "react-toastify";

import {DayOfWeek} from "../entities/meal-plan-day.entity";
import {MealType} from "../entities/meal-plan-day.entity";

export default function MealSchedulerModal({recipeId}: {recipeId: number;}): ReactElement {
    const [day, setDay] = useState<DayOfWeek | undefined>();
    const [mealType, setMealType] = useState<MealType | undefined>();

    const handleSchedule = (): void => {
        axios.put(`/api/mealplan/${recipeId}`, {type: mealType, day: day}).then(async () => {
            toast.success("Added meal to meal plan.");
        })
            .catch((): void => {
                toast.error("Failed to add meal to meal plan.");
            });
    };

    return (
        <div id="mealPlanModal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full bg-black/50">
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative bg-white p-4 rounded-lg shadow dark:bg-gray-800">
                    <div className="flex justify-between items-center pb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Schedule a Meal</h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="toolsModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <label htmlFor="mealName" className="block mb-2 text-sm font-medium text-white">Meal</label>
                            <select
                                id="mealType"
                                name="mealType"
                                defaultValue=""
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={mealType}
                                onChange={e => { setMealType(e.target.value as MealType) }}
                                required
                            >
                                <option value="" disabled>Select meal</option>
                                <option value={MealType.Breakfast}>Breakfast</option>
                                <option value={MealType.Lunch}>Lunch</option>
                                <option value={MealType.Dinner}>Dinner</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="dayName" className="block mb-2 text-sm font-medium text-white">Day</label>
                            <select
                                id="day"
                                name="day"
                                defaultValue=""
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={day}
                                onChange={e => { setDay(e.target.value as DayOfWeek) }}
                                required
                            >
                                <option value="" disabled>Select day</option>
                                <option value={DayOfWeek.Sunday}>Sunday</option>
                                <option value={DayOfWeek.Monday}>Monday</option>
                                <option value={DayOfWeek.Tuesday}>Tuesday</option>
                                <option value={DayOfWeek.Wednesday}>Wednesday</option>
                                <option value={DayOfWeek.Thursday}>Thursday</option>
                                <option value={DayOfWeek.Friday}>Friday</option>
                                <option value={DayOfWeek.Saturday}>Saturday</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={handleSchedule} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Schedule</button>
                            <button onClick={() => {}} className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
