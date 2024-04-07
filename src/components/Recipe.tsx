import Image from "next/image";
import Link from "next/link";
import {type ReactElement} from "react";

import {
    type Recipe as RecipeEntity, RecipeDifficulty,
} from "@/entities/recipe.entity";

export default function Recipe({recipe}: {recipe: RecipeEntity;}): ReactElement {
    return <div>
        <Link
            href={`/recipes/${recipe.id}`}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-full"
        >
            <Image className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={"/image-missing.svg"} alt="" height={64} width={64} />
            <div className="flex flex-col justify-between p-4 leading-normal text-center md:text-left space-y-2">
                <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{recipe.title}</p>
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
                <div className="">
                    {recipe.difficulty === RecipeDifficulty.Easy && <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Easy</span>}
                    {recipe.difficulty === RecipeDifficulty.Medium && <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Medium</span>}
                    {recipe.difficulty === RecipeDifficulty.Difficult && <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Difficult</span>}
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{recipe.category}</span>
                </div>
                {recipe.tags.length >= 0 && <div className="">
                    {recipe.tags.map(tag => <span key={tag.id} className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">{tag.code}</span>)}
                </div>}
                <p className="font-normal text-gray-700 dark:text-gray-400">{recipe.description.substring(0, 250)}{recipe.description.length >= 250 && "..."}</p>
            </div>
        </Link>
    </div>;
}
