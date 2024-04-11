import React from "react";

// Define an interface for the component's props
interface SavedRecipeComponentProps {
    title: string;
    description: string;
    onClick: () => void; // Updated the prop type to reflect the event change
}

const SavedRecipeComponent: React.FC<SavedRecipeComponentProps> = ({
    title,
    description,
    onClick, // Updated to use onClick
}): React.JSX.Element => (
    <div
        onClick={onClick} // Changed from onDoubleClick to onClick
        className="cursor-pointer bg-white dark:bg-gray-700 shadow rounded-lg p-4 mb-4"
    >
        <div>
            <h5 className="text-lg font-bold">{title || "Title"}</h5>
            <p className="text-sm text-gray-700 dark:text-white">{description || "Description"}</p>
        </div>
    </div>
);

export default SavedRecipeComponent;
