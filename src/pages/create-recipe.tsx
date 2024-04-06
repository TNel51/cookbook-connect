import type {AxiosError} from "axios";
import axios from "axios";
import type {FormEvent} from "react";
import {type ReactElement, useState} from "react";
import {toast} from "react-toastify";

import type {RecipeCategory, RecipeDifficulty} from "@/entities/recipe.entity";
import {type Recipe} from "@/entities/recipe.entity";

import AddIngredientModal from "../components/CreateRecipe/AddIngredientModal";
import AddToolModal from "../components/CreateRecipe/AddToolModal";
import type {BaseEntityFields} from "../entities/base-entity";
import type {Ingredient} from "../entities/ingredient.entity";
import type {RecipeIngredient} from "../entities/recipe-ingredient.entity";
import type {Tool} from "../entities/tool.entity";

export default function CreateRecipe(): ReactElement {
    const [title, setTitle] = useState<string>();
    const [category, setCategory] = useState<RecipeCategory>();
    const [difficulty, setDifficulty] = useState<RecipeDifficulty>();
    const [instructions, setInstructions] = useState<string>();
    const [time, setTime] = useState<string>();

    const [tools, setTools] = useState<Tool[]>([]);
    const [ingredients, setIngredients] = useState<Array<Omit<RecipeIngredient, BaseEntityFields | "recipe" | "recipeId">>>([]);
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
    
    const createRecipe = (e: FormEvent): void => {
        e.preventDefault();
        setSubmitDisabled(true);
        
        axios.post<Recipe>(`/api/recipes`, {
            public: false,
            title: title,
            category: category,
            difficulty: difficulty,
            instructions: instructions,
            time: time,
            tags: [],
            tools: tools.map(t => t.id),
            ingredients: ingredients,
        }).then(async res => {
            toast.success(`Created new recipe: ${res.data.title}`);
            // Redirect
        })
            .catch((error: AxiosError): void => {
                toast.error(error.response?.data ? `Failed to create recipe: ${error.response.data as string}` : `Failed to create recipe.`);
                setSubmitDisabled(false);
            });
    };
    
    return <>
        <section>
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Create a New Recipe</h2>
                <form className="mx-auto" onSubmit={createRecipe}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-4">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipe Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type recipe title"
                                value={title}
                                onChange={e => { setTitle(e.target.value) }}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <select
                                id="category"
                                name="category"
                                defaultValue=""
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={category}
                                onChange={e => { setCategory(e.target.value as RecipeCategory) }}
                                required
                            >
                                <option value="" disabled>Select category</option>
                                <option value="Snack">Sanck</option>
                                <option value="Appetizer">Appetizer</option>
                                <option value="Meal">Meal</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Side">Side</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="difficulty" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Difficulty</label>
                            <select
                                id="difficulty"
                                name="difficulty"
                                defaultValue=""
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={difficulty}
                                onChange={e => { setDifficulty(e.target.value as RecipeDifficulty) }}
                                required
                            >
                                <option value="" disabled>Select difficulty</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Difficult">Difficult</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 flex justify-between">
                                            <div className="my-auto">Tools</div>
                                            <button type="button" data-modal-target="toolsModal" data-modal-toggle="toolsModal">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tools.length
                                        ? tools.map(tool => <tr key={tool.id} className="bg-white border-y dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex justify-between">
                                                <div className="my-auto">{tool.text}</div>
                                                <button type="button" onClick={() => { setTools(tools.filter(t => t.id !== tool.id)) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-400">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>)
                                        : <tr className="bg-white border-y dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-6 py-4 font-medium text-gray-400 whitespace-nowrap flex justify-between">
                                                    <div className="my-auto italic">There aren&apos;t any tools. Add some!</div>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="sm:col-span-2">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="my-auto">Ingredient</div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 flex justify-between">
                                            <div className="my-auto">Quantity</div>
                                            <button type="button" data-modal-target="ingredientsModal" data-modal-toggle="ingredientsModal">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ingredients.length
                                        ? ingredients.map(ingredient => <tr key={ingredient.ingredientId} className="bg-white border-y dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {ingredient.ingredient.text}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex justify-between">
                                                <div className="my-auto me-2">
                                                    <input
                                                        type="text"
                                                        id="ingrQuantity"
                                                        defaultValue={ingredient.quantity}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="1/2 tbsp."
                                                        required
                                                        onChange={e => {
                                                            const ingr = ingredients.find(i => i.ingredientId === ingredient.ingredientId);
                                                            if (!ingr) throw Error("Somehow couldn't find ingredient!");
                                                            ingr.quantity = e.target.value;
                                                            setIngredients(ingredients);
                                                        }}
                                                    />
                                                </div>
                                                <button type="button" onClick={() => { setIngredients(ingredients.filter(t => t.ingredient.id !== ingredient.ingredient.id)) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-400">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>)
                                        : <tr className="bg-white border-y dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-6 py-4 font-medium text-gray-400 whitespace-nowrap" colSpan={2}>
                                                    <div className="my-auto italic">There aren&apos;t any ingredients. Add some!</div>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="sm:col-span-2">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 flex justify-between">
                                            <div className="my-auto">Tags</div>
                                            <button type="button">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-y dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex justify-between">
                                            <div className="my-auto">Japanese</div>
                                            <button type="button">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-y dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex justify-between">
                                            <div className="my-auto">Delicacy</div>
                                            <button type="button">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="instructions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instructions</label>
                            <textarea
                                id="instructions"
                                rows={4}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Make dough. Bake. Enjoy!"
                                value={instructions}
                                onChange={e => { setInstructions(e.target.value) }}
                                required
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="timeRequired" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time Required</label>
                            <input
                                type="text"
                                name="timeRequired"
                                id="timeRequired"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="45 minutes"
                                value={time}
                                onChange={e => { setTime(e.target.value) }}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" disabled={submitDisabled} className="disabled:cursor-not-allowed disabled:bg-slate-500 disabled:hover:bg-slate-500 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
                </form>
            </div>
        </section>
        <AddToolModal addTool={(tool: Tool) => { if (!tools.some(t => t.id === tool.id)) setTools([...tools, tool]); }} currentTools={tools} />
        <AddIngredientModal addIngredient={(ingredient: Ingredient) => {
            if (!ingredients.some(t => t.ingredient.id === ingredient.id)) setIngredients([...ingredients, {
                ingredient: ingredient, ingredientId: ingredient.id, quantity: "", required: true,
            } ]);
        }} currentIngredients={ingredients.map(i => i.ingredient)} />
    </>;
}
