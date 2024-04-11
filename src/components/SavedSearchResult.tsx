import type {ReactElement} from "react";
import React from "react";

// Define an interface for the component's props
interface SavedRecipeComponentProps {
    title: string;
    description: string;
    onClick: () => void; // Updated the prop type to reflect the event change
}

export default function SavedRecipeComponent({
    title,
    description,
    onClick, // Updated to use onClick
}: SavedRecipeComponentProps): ReactElement {
    return <div
        onClick={onClick} // Changed from onDoubleClick to onClick
        className="cursor-pointer bg-white dark:bg-gray-700 shadow rounded-lg p-4 mb-4"
    >
        <div>
            <h5 className="text-lg font-bold">{title || "Title"}</h5>
            <p className="text-sm text-gray-700 dark:text-white">{description || "Description"}</p>
        </div>
    </div>;
}
