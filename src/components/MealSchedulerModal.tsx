import axios from "axios";
import {useRouter} from "next/router"; // Use Next.js's built-in router
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";

interface MealSchedulerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSchedule: (meal: string, day: string, recipeId: string) => void;
}

const MealSchedulerModal: React.FC<MealSchedulerModalProps> = ({
    isOpen, onClose, onSchedule,
}) => {
    const [meal, setMeal] = useState("");
    const [day, setDay] = useState("");
    const [scheduledMeals, setScheduledMeals] = useState([]);
    const router = useRouter(); // Using Next.js router
    const recipeId = router.query.recipeId as string; // Access recipeId from the URL

    useEffect(() => {
        const meals = localStorage.getItem("scheduledMeals");
        if (meals) {
            setScheduledMeals(JSON.parse(meals));
        }
    }, []);

    const handleSchedule = async () => {
        try {
            const response = await axios.post("/api/scheduleMeal", {
                meal, day, recipeId,
            });
            const newMeal = {
                meal, day, recipeId,
            };
            const updatedMeals = [...scheduledMeals, newMeal];
            setScheduledMeals(updatedMeals);
            localStorage.setItem("scheduledMeals", JSON.stringify(updatedMeals));
            onSchedule(meal, day, recipeId);
            toast.success("Meal scheduled successfully!");
            onClose();
        } catch (error) {
            toast.error("Failed to schedule meal!");
        }
    };

    if (!isOpen) return null;

    return (
        <div id="mealModal" tabIndex={-1} aria-hidden="true" className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${isOpen ? "" : "hidden"}`}>
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative bg-white p-4 rounded-lg shadow dark:bg-gray-800">
                    <div className="flex justify-between items-center pb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Schedule a Meal</h3>
                        <button type="button" onClick={onClose} className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm p-1.5">
                            <span className="sr-only">Close modal</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <label htmlFor="mealName" className="block mb-2 text-sm font-medium text-white">Meal</label>
                            <select
                                id="mealName"
                                value={meal}
                                onChange={e => { setMeal(e.target.value) }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            >
                                <option value="">Select a Meal</option>
                                {mealOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="dayName" className="block mb-2 text-sm font-medium text-white">Day</label>
                            <select
                                id="dayName"
                                value={day}
                                onChange={e => { setDay(e.target.value) }}
                                className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            >
                                <option value="">Select a Day</option>
                                <option value="Sunday">Sunday</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={handleSchedule} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Schedule</button>
                            <button onClick={onClose} className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealSchedulerModal;
