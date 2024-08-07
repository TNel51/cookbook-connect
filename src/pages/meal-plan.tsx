import axios from "axios";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import type {ReactElement} from "react";
import React, {useEffect} from "react";
import {toast} from "react-toastify";
import useSWR from "swr";

import Loading from "../components/Loading";
import MealPlanColumn from "../components/MealPlanColumn";
import type {MealPlanDay} from "../entities/meal-plan-day.entity";
import {DayOfWeek} from "../entities/meal-plan-day.entity";
import {fetcher} from "../lib/swrFetcher";

const MealPlan = (): ReactElement => {
    const session = useSession();
    const router = useRouter();
    const {
        data: mealPlanDays, error: mealPlanError, isLoading, mutate: mutateMealPlan,
    } = useSWR<MealPlanDay[], Error>("/api/mealplan", fetcher);

    // Function to generate PDF, ensured to be client-side only
    const generatePDF = async (): Promise<void> => {
        // Dynamically import html2pdf only when this function is called, ensuring it's client-side
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const html2pdf = (await import("html2pdf.js")).default;
        const element = document.getElementById("recipepdf");  // Ensure this ID matches your document element
        if (!element) {
            // eslint-disable-next-line no-console
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

    const clearPlan = (): void => {
        axios.delete("/api/mealplan").then(async () => {
            toast.success("Cleared meal planning list.");
            await mutateMealPlan();
        })
            .catch((): void => {
                toast.error("Failed to clear planning list.");
            });
    };
    
    useEffect(() => {
        if (session.status === "unauthenticated") router.push("/sign-in")
            .catch(() => toast.error("Failed to redirect when not logged in."));
    });

    if (session.status !== "authenticated") return <Loading />;

    if (mealPlanError) return <div>Error loading meal plan!</div>;
    if (isLoading || !mealPlanDays) return <Loading />;
    
    return (
        <div className="container mx-auto mt-10">
            <div className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Meal Planning
            </div>
            <div id="recipepdf" className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                <MealPlanColumn day={DayOfWeek.Sunday} meals={mealPlanDays.filter(m => m.day === DayOfWeek.Sunday)} />
                <MealPlanColumn day={DayOfWeek.Monday} meals={mealPlanDays.filter(m => m.day === DayOfWeek.Monday)} />
                <MealPlanColumn day={DayOfWeek.Tuesday} meals={mealPlanDays.filter(m => m.day === DayOfWeek.Tuesday)} />
                <MealPlanColumn day={DayOfWeek.Wednesday} meals={mealPlanDays.filter(m => m.day === DayOfWeek.Wednesday)} />
                <MealPlanColumn day={DayOfWeek.Thursday} meals={mealPlanDays.filter(m => m.day === DayOfWeek.Thursday)} />
                <MealPlanColumn day={DayOfWeek.Friday} meals={mealPlanDays.filter(m => m.day === DayOfWeek.Friday)} />
                <MealPlanColumn day={DayOfWeek.Saturday} meals={mealPlanDays.filter(m => m.day === DayOfWeek.Saturday)} />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                {/* eslint-disable-next-line no-void */}
                <button onClick={() => { void generatePDF() }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Export Week
                </button>
               
                <button onClick={() => { clearPlan() } } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Clear
                </button>
            </div>
           
<div className = "flex justify-end">
<p className="text-sm mt-1">PDF generation may not work in Safari browser</p>
</div>

        </div>
    );
};

export default MealPlan;
