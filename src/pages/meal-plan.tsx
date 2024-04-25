import html2pdf from "html2pdf.js";  // Direct import, no dynamic needed
import type {ReactElement} from "react";
import React, {useEffect, useState} from "react";

import DayColumn from "../components/MealPlanColumn";

const MealPlan = (): ReactElement => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const mealContent = {
        breakfast: "Tomato Soup",
        lunch: "Tomato Soup",
        dinner: "Tomato Soup",
    };

    // Function to generate PDF, ensured to be client-side only
    const generatePDF = async (): Promise<void> => {
        // Dynamically import html2pdf only when this function is called, ensuring it's client-side
        const html2pdf = (await import("html2pdf.js")).default;
        const element = document.getElementById("recipepdf");  // Ensure this ID matches your document element
        if (!element) {
            console.error("Element not found");
            return;
        }
    
        // Create the PDF from the specified element
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        html2pdf().set({
            margin: 0.5,
            filename: "week-meal-plan.pdf",
            image: {type: "jpeg", quality: 1},
            html2canvas: {scale: 1},
            jsPDF: {
                unit: "in",
                format: "letter",
                orientation: "portrait",
                precision: "12",
            },
        })
            .from(element)
            .save();
    };
    
    return (
        <div className="container mx-auto mt-10">
            <div className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Meal Planning
            </div>
            <div id="recipepdf" className="flex flex-wrap justify-between">
                {daysOfWeek.map(day => (
                    <DayColumn key={day} day={day} meals={mealContent} />
                ))}
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Export Shopping List
                </button>
                <button onClick={generatePDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Export Week
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Clear
                </button>
            </div>
        </div>
    );
};

export default MealPlan;
