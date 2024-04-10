import React from "react";

import RecipeCard from "../components/PublicSearchResult"; // Adjust the path as necessary
import SearchComponent from "../components/Search"; // Import the SearchComponent

const recipeData = [
    {
        id: 1,
        title: "Spaghetti Carbonara",
        description: "A classic Italian pasta dish with a rich, creamy sauce.",
        imageUrl: "./public/next",
    },
    {
        id: 2,
        title: "Tomato Basil Soup",
        description: "A comforting soup perfect for cold days.",
        imageUrl: "path_to_tomato_soup_image.jpg",
    },
    {
        id: 3,
        title: "Tomato Basil Soup",
        description: "A comforting soup perfect for cold days.",
        imageUrl: "path_to_tomato_soup_image.jpg",
    },
    {
        id: 4,
        title: "Tomato Basil Soup",
        description: "A comforting soup perfect for cold days.",
        imageUrl: "path_to_tomato_soup_image.jpg",
    },
    // ... more recipes
];

const SearchPublicRecipes = () => {
    // Define the handler for viewing a recipe
    const handleViewRecipe = recipeId => {
        // Logic to handle viewing the recipe details
        console.log("Viewing recipe", recipeId);
    };

    // This is a stub for the search function, replace with actual search logic
    const handleSearch = searchCriteria => {
        // You will need to implement the logic to filter the recipeData based on the search criteria
        console.log("Search criteria:", searchCriteria);
    };

    return (
        <div className="container mx-auto p-6">
            <SearchComponent onSearch={handleSearch} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipeData.map(recipe => (
                    <RecipeCard
                        key={recipe.id}
                        title={recipe.title}
                        description={recipe.description}
                        imageUrl={recipe.imageUrl}
                        onViewRecipe={() => { handleViewRecipe(recipe.id) }}
                    />
                ))}
            </div>
        </div>
    );
};

export default SearchPublicRecipes;
