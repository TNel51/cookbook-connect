import axios from "axios";
import {
    type ReactElement, useCallback, useEffect, useState,
} from "react";
import {toast} from "react-toastify";

import Recipe from "../../components/Recipe";
import RecipeSearch from "../../components/RecipeSearch";
import type {
    Recipe as RecipeEntity,
    RecipeCategory,
    RecipeDifficulty,
} from "../../entities/recipe.entity";

export default function Recipes(): ReactElement {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [recipes, setRecipes] = useState<RecipeEntity[]>([]);
    const [totalRecipes, setTotalRecipes] = useState<number>(0);
    const [searchKey, setSearchKey] = useState<string>("");
    const [categoryFilter, setCategoryFilter] = useState<RecipeCategory | "Any">("Any");
    const [difficultyFilter, setDifficultyFilter] = useState<RecipeDifficulty | "Any">("Any");

    const loadMoreRecipes = useCallback((): void => {
        if (recipes.length >= totalRecipes || loadingMore) return;
        setLoadingMore(true);

        axios.get<{total: number; recipes: RecipeEntity[];}>(`/api/recipes?mine=true&take=10&skip=${recipes.length}${categoryFilter !== "Any" ? `&category=${categoryFilter}` : ""}${difficultyFilter !== "Any" ? `&difficulty=${difficultyFilter}` : ""}${searchKey !== "" ? `&key=${searchKey}` : ""}`)
            .then(res => {
                setRecipes([...recipes, ...res.data.recipes.filter(r => !recipes.some(rr => rr.id === r.id))]);
                setLoadingMore(false);
                setTotalRecipes(res.data.total);
            })
            .catch(() => {
                toast.error("Failed to load recipes");
                setLoadingMore(false);
            });
    }, [loadingMore, recipes, totalRecipes, searchKey, categoryFilter, difficultyFilter]);

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
        axios.get<{total: number; recipes: RecipeEntity[];}>(`/api/recipes?take=10&skip=0${categoryFilter !== "Any" ? `&category=${categoryFilter}` : ""}${difficultyFilter !== "Any" ? `&difficulty=${difficultyFilter}` : ""}${searchKey !== "" ? `&key=${searchKey}` : ""}`)
            .then(res => {
                setRecipes(res.data.recipes);
                setLoading(false);
                setTotalRecipes(res.data.total);
            })
            .catch(() => {
                toast.error("Failed to load recipes");
            });
    }, [searchKey, categoryFilter, difficultyFilter]);
    
    return <section>
        <RecipeSearch
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            difficultyFilter={difficultyFilter}
            setDifficultyFilter={setDifficultyFilter}
        />
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
