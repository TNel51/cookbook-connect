import React from "react";

const SavedRecipeComponent = ({
    title, description, onDoubleClick,
}) => (
    <div
        onDoubleClick={onDoubleClick}
        className="cursor-pointer bg-white dark:bg-gray-700 shadow rounded-lg p-4 mb-4"
    >
        <div>
            <h5 className="text-lg font-bold">{title || "Title"}</h5>
            <p className="text-sm text-gray-700 dark:text-white">{description || "Description"}</p>
        </div>
    </div>
);

export default SavedRecipeComponent;
