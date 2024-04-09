import DOMPurify from "dompurify";
import {useParams} from "next/navigation";
import type {FormEvent} from "react";
import {type ReactElement, useState} from "react";
import useSWR from "swr";

import Rating from "@/components/Rating";
import type {Rating as RatingEntity} from "@/entities/rating.entity";
import {type Recipe as RecipeEntity, RecipeDifficulty} from "@/entities/recipe.entity";

import {fetcher} from "../../lib/swrFetcher";

export default function Recipe(): ReactElement {
    const params = useParams<{id: string;}>() as {id: string;} | undefined;
    const {
        data: recipe, isLoading, error,
    } = useSWR<RecipeEntity, Error>(params?.id ? `/api/recipes/${params.id}` : undefined, fetcher);
    const [ratingNumStars, setRatingNumStars] = useState<number>(0);
    const [ratingComment, setRatingComment] = useState<string>("");

    const createRating = (e: FormEvent): void => {
        e.preventDefault();
    };

    if (isLoading || !recipe) return <div className="flex max-w-20 mx-auto">
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
    </div>;

    if (error) return <div>Failed to load recipe!</div>;
    
    return <section className="space-y-4">
        <div className="text-2xl flex space-x-2">
            <span>{recipe.title}</span>
            <div className="flex my-auto space-x-1 rtl:space-x-reverse">
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                {Math.round(recipe.numStars) >= 0 && [...Array(Math.round(recipe.numStars))].map((e, i) => <svg key={i} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>)}
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                {Math.round(recipe.numStars) < 5 && [...Array(5 - Math.round(recipe.numStars))].map((e, i) => <svg key={i} className="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>)}
            </div>
        </div>
        <div>
            {recipe.difficulty === RecipeDifficulty.Easy && <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Easy</span>}
            {recipe.difficulty === RecipeDifficulty.Medium && <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Medium</span>}
            {recipe.difficulty === RecipeDifficulty.Difficult && <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Difficult</span>}
            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{recipe.category}</span>
        </div>
        {recipe.tags.length && <div>
            {recipe.tags.map(tag => <span key={tag.id} className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">{tag.code}</span>)}
        </div>}
        <div><span className="font-bold">Time required:</span> {recipe.time}</div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th className="px-6 py-3 flex justify-between">
                        <div className="my-auto">Tools</div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {recipe.tools.map(tool => <tr key={tool.id} className="bg-white border-y dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="my-auto">{tool.text}</div>
                    </td>
                </tr>)}
            </tbody>
        </table>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th className="px-6 py-3">
                        <div className="my-auto">Ingredient</div>
                    </th>
                    <th className="px-6 py-3 flex justify-between">
                        <div className="my-auto">Quantity</div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {recipe.ingredients.length
                    ? recipe.ingredients.map(ingredient => <tr key={ingredient.ingredientId} className="bg-white border-y dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {ingredient.ingredient.text}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {ingredient.quantity}
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
        <div>
            <label className="font-bold">Instructions</label>
            <div className="prose dark:prose-invert prose-sm" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(recipe.instructions)}} />
        </div>
        <form className="space-y-2" onSubmit={createRating}>
            <label className="font-bold">Rate this Recipe</label>
            <div className="flex items-center mb-1 space-x-1">
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                {ratingNumStars >= 0 && [...Array(ratingNumStars)].map((e, i) => <svg key={i} onClick={() => { setRatingNumStars(i + 1) }} className="w-4 h-4 text-yellow-300 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>)}
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                {ratingNumStars < 5 && [...Array(5 - ratingNumStars)].map((e, i) => <svg key={ratingNumStars + i} onClick={() => { setRatingNumStars(ratingNumStars + i + 1) }} className="w-4 h-4 text-gray-300 dark:text-gray-500 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>)}
            </div>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label htmlFor="comment" className="sr-only">Your comment</label>
                    <textarea id="comment" rows={4} value={ratingComment} onChange={e => { setRatingComment(e.target.value) }} className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..."></textarea>
                </div>
            </div>
            <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                Submit Rating
            </button>
        </form>
        <div className="relative z-0 w-full mb-5 group">
            <div className="grid gap-4">
                <Rating rating={{
                    user: {
                        displayName: "Bobby Hill",
                        createdAt: new Date(),
                    },
                    numStars: 4,
                    createdAt: new Date(),
                    comment: "This was really good",
                } as RatingEntity} />
                <Rating rating={{
                    user: {
                        displayName: "Hank Hill",
                        createdAt: new Date(),
                    },
                    numStars: 2,
                    createdAt: new Date(),
                } as RatingEntity} />
            </div>
        </div>
    </section>;
}
