import React from "react";

// Define a type for the props
interface RecipeCardProps {
    imageUrl: string;
    title: string;
    description: string;
    onViewRecipe: () => void; // Assuming this is a function that doesn't take any parameters and doesn't return anything
}

const RecipeCard: React.FC<RecipeCardProps> = ({
    imageUrl,
    title,
    description,
    onViewRecipe,
}) => (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white  dark:bg-gray-700">
        <img className="w-full" src={imageUrl} alt={title} />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 dark:text-white text-base">
                {description}
            </p>
        </div>
        <div className="px-6 pt-4 pb-2">
            <button
                onClick={onViewRecipe}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
          View Recipe
            </button>
        </div>
    </div>
);

export default RecipeCard;
