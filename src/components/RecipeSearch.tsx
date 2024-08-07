import type {ReactElement} from "react";

import type {RecipeCategory, RecipeDifficulty} from "../entities/recipe.entity";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function RecipeSearch({
    searchKey,
    setSearchKey,
    categoryFilter,
    setCategoryFilter,
    difficultyFilter,
    setDifficultyFilter,
}: {
    searchKey: string;
    setSearchKey: (key: string) => void;
    categoryFilter: RecipeCategory | "Any";
    setCategoryFilter: (category: RecipeCategory | "Any") => void;
    difficultyFilter: RecipeDifficulty | "Any";
    setDifficultyFilter: (difficulty: RecipeDifficulty | "Any") => void;
}): ReactElement {
    return (
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-4 my-5">
            <form className="md:flex justify-center items-center w-full md:space-x-6">
                <div className="md:flex md:space-x-2 mb-4 md:mb-0">
                    <label htmlFor="search_key" className="mb-2 md:my-auto md:me-2 block text-sm font-medium text-gray-900 dark:text-white">Search</label>
                    <input
                        type="text"
                        id="search_key"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search recipe"
                        value={searchKey}
                        onChange={e => { setSearchKey(e.target.value) }}
                    />
                </div>
                <div className="md:flex md:space-x-2 mb-4 md:mb-0">
                    <label htmlFor="category" className="mb-2 md:my-auto md:me-2 block text-sm font-medium text-gray-900 dark:text-white">Category</label>
                    <select
                        id="category"
                        value={categoryFilter}
                        onChange={e => { setCategoryFilter(e.target.value as RecipeCategory | "Any") }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="Any">Any</option>
                        <option value="Snack">Sanck</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Meal">Meal</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Side">Side</option>
                    </select>
                </div>
                <div className="md:flex md:space-x-2">
                    <label htmlFor="difficulty" className="mb-2 md:my-auto md:me-2 block text-sm font-medium text-gray-900 dark:text-white">Difficulty</label>
                    <select
                        id="difficulty"
                        value={difficultyFilter}
                        onChange={e => { setDifficultyFilter(e.target.value as RecipeDifficulty | "Any") }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="Any">Any</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Difficult">Difficult</option>
                    </select>
                </div>
            </form>
        </div>
    );
}
