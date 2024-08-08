import axios from "axios";
import {
    type ReactElement, useCallback, useEffect, useState,
} from "react";
import {toast} from "react-toastify";

import Recipe from "../components/Recipe";
import RecipeSearch from "../components/RecipeSearch";
import type {
    Recipe as RecipeEntity,
    RecipeCategory,
    RecipeDifficulty,
} from "../entities/recipe.entity";

export default function Recipes(): ReactElement {
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [recipes, setRecipes] = useState<RecipeEntity[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [searchKey, setSearchKey] = useState<string>("");
    const [categoryFilter, setCategoryFilter] = useState<RecipeCategory | "Any">("Any");
    const [difficultyFilter, setDifficultyFilter] = useState<RecipeDifficulty | "Any">("Any");

    const loadMoreRecipes = useCallback((): void => {
        if (!hasMore || loadingMore) return;
        setLoadingMore(true);

        axios.get<{recipes: RecipeEntity[];}>(`/api/recipes?take=10&skip=${recipes.length}${categoryFilter !== "Any" ? `&category=${categoryFilter}` : ""}${difficultyFilter !== "Any" ? `&difficulty=${difficultyFilter}` : ""}${searchKey !== "" ? `&key=${searchKey}` : ""}`)
            .then(res => {
                const newRecipes = res.data.recipes.filter(r => !recipes.some(rr => rr.id === r.id));
                setRecipes(prevRecipes => [...prevRecipes, ...newRecipes]);
                setHasMore(newRecipes.length === 10);
                setLoadingMore(false);
            })
            .catch((error) => {
                console.error("API Error:", error);
                toast.error("Failed to load more recipes");
                setLoadingMore(false);
            });
    }, [loadingMore, recipes, hasMore, searchKey, categoryFilter, difficultyFilter]);

    useEffect(() => {
        const handleScrollEvent = (): void => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
                loadMoreRecipes();
            }
        };

        window.addEventListener("scroll", handleScrollEvent);
        return () => { window.removeEventListener("scroll", handleScrollEvent) };
    }, [loadMoreRecipes]);

    useEffect(() => {
        setLoading(true);
        setRecipes([]);
        setHasMore(true);
        
        axios.get<{recipes: RecipeEntity[];}>(`/api/recipes?take=10&skip=0${categoryFilter !== "Any" ? `&category=${categoryFilter}` : ""}${difficultyFilter !== "Any" ? `&difficulty=${difficultyFilter}` : ""}${searchKey !== "" ? `&key=${searchKey}` : ""}`)
            .then(res => {
                setRecipes(res.data.recipes);
                setHasMore(res.data.recipes.length === 10);
                setLoading(false);
            })
            .catch((error) => {
                console.error("API Error:", error);
                toast.error("Failed to load recipes");
                setLoading(false);
            });
    }, [searchKey, categoryFilter, difficultyFilter]);

    return (
        <section>
            <RecipeSearch
                searchKey={searchKey}
                setSearchKey={setSearchKey}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                difficultyFilter={difficultyFilter}
                setDifficultyFilter={setDifficultyFilter}
            />
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                {recipes.map(r => <Recipe key={r.id} recipe={r}/>)}
                {!loading && recipes.length === 0 && (
                    <div className="md:col-span-2 text-center text-lg mt-2">No recipes found.</div>
                )}
                {(loadingMore || loading) && (
                    <div className="md:col-span-2">
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
                )}
            </div>
        </section>
    );
}