import axios from "axios";
import {Modal} from "flowbite-react";
import type {ReactElement} from "react";
import React, {useState} from "react";
import {toast} from "react-toastify";

import {DayOfWeek} from "../entities/meal-plan-day.entity";
import {MealType} from "../entities/meal-plan-day.entity";

export default function MealSchedulerModal({
    recipeId,
    openModal,
    setOpenModal,
}: {
    recipeId: number;
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}): ReactElement {
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
        <Modal dismissible show={openModal} onClose={() => { setOpenModal(false) }}>
            <Modal.Header>Schedule a Meal</Modal.Header>
            <Modal.Body className="space-y-4">
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
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleSchedule} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Schedule</button>
                <button onClick={() => { setOpenModal(false) }} className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
            </Modal.Footer>
        </Modal>
    );
}
