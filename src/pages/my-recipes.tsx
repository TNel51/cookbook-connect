import axios from "axios";
import Link from "next/link";
import {
    type ReactElement,     useCallback,
    useEffect, useState,
} from "react";
import {toast} from "react-toastify";

import Recipe from "@/components/Recipe";
import type {RecipeCategory, RecipeDifficulty} from "@/entities/recipe.entity";
import {type Recipe as RecipeEntity} from "@/entities/recipe.entity";

export default function MyRecipes(): ReactElement {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [recipes, setRecipes] = useState<RecipeEntity[]>([]);
    const [totalRecipes, setTotalRecipes] = useState<number>(0);
    const [categoryFilter, setCategoryFilter] = useState<RecipeCategory | "Any">("Any");
    const [difficultyFilter, setDifficultyFilter] = useState<RecipeDifficulty | "Any">("Any");

    const loadMoreRecipes = useCallback((): void => {
        if (recipes.length >= totalRecipes || loadingMore) return;
        setLoadingMore(true);

        axios.get<{total: number; recipes: RecipeEntity[];}>(`/api/recipes?mine=true&take=10&skip=${recipes.length}`)
            .then(res => {
                setRecipes([...recipes, ...res.data.recipes.filter(r => !recipes.some(rr => rr.id === r.id))]);
                setLoadingMore(false);
                setTotalRecipes(res.data.total);
            })
            .catch(() => {
                toast.error("Failed to load recipes");
                setLoadingMore(false);
            });
        
    }, [loadingMore, recipes, totalRecipes]);

    useEffect(() => {
        const handleScrollEvent = (): void => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                loadMoreRecipes();
            }
        };

        window.addEventListener("scroll", handleScrollEvent);
        return () => { window.removeEventListener("scroll", handleScrollEvent) };
    }, [loadMoreRecipes]);

    useEffect(() => {
        setLoading(true);
        axios.get<{total: number; recipes: RecipeEntity[];}>(`/api/recipes?mine=true&take=10&skip=0${categoryFilter !== "Any" ? `&category=${categoryFilter}` : ""}${difficultyFilter !== "Any" ? `&difficulty=${difficultyFilter}` : ""}`)
            .then(res => {
                setRecipes(res.data.recipes);
                setLoading(false);
                setTotalRecipes(res.data.total);
            })
            .catch(() => {
                toast.error("Failed to load recipes");
            });
    }, [categoryFilter, difficultyFilter]);

    return <section>
        <div className="flex justify-between align-center">
            <h1 className="text-2xl font-bold">My Recipes</h1>
            <Link href="/create-recipe" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-slate-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-slate-600 dark:text-slate-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Create Recipe
            </Link>
        </div>
        <div className="max-w-lg mx-auto mb-4">
            <div className="md:flex justify-center">
                <div className="md:flex md:me-4 mb-2 md:mb-0">
                    <label htmlFor="category" className="mb-2 md:my-auto md:me-2 block text-sm font-medium text-gray-900 dark:text-white">Category</label>
                    <select id="category" value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value as RecipeCategory | "Any") }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="Any">Any</option>
                        <option value="Snack">Sanck</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Meal">Meal</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Side">Side</option>
                    </select>
                </div>
                <div className="md:flex">
                    <label htmlFor="difficulty" className="mb-2 md:my-auto md:me-2 block text-sm font-medium text-gray-900 dark:text-white">Difficulty</label>
                    <select id="difficulty" value={difficultyFilter} onChange={e => { setDifficultyFilter(e.target.value as RecipeDifficulty | "Any") }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="Any">Any</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Difficult">Difficult</option>
                    </select>
                </div>
            </div>
        </div>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            {!loading && (recipes.length ? recipes.map(r => <Recipe key={r.id} recipe={r}/>) : <div className="md:col-span-2 text-center text-lg mt-2">No recipes! Create one.</div>)}
            {loadingMore || loading
                ? <div className="md:col-span-2">
                        <div className="flex max-w-20 mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                                <circle fill="#266BFF" stroke="#266BFF" strokeWidth="15" r="15" cx="40" cy="65">
                                    <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
                                </circle>
                                <circle fill="#266BFF" stroke="#266BFF" strokeWidth="15" r="15" cx="100" cy="65">
                                    <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
                                </circle>
                                <circle fill="#266BFF" stroke="#266BFF" strokeWidth="15" r="15" cx="160" cy="65">
                                    <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
                                </circle>
                            </svg>
                        </div>
                    </div>
                : recipes.length < totalRecipes && <div className="md:col-span-2 flex justify-center">
                    <button type="button" onClick={() => { loadMoreRecipes() } } className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-md px-8 py-2 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Load More</button>
                </div>}
        </div>
    </section>;
}
