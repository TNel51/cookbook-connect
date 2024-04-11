import {useEffect, useState} from "react";

const SearchComponent = ({onSearch}: {onSearch: (search: string) => void;}) => {
    // Specify the type of the state
    const [isDropdownVisible, setDropdownVisible] = useState<Record<number, boolean>>({});

    const dropdownOptions = [
        ["Test1", "Test2"], // Options for the first dropdown
        ["Option1", "Option2"], // Options for the second dropdown
        ["Choice1", "Choice2"], // Options for the third dropdown
    ];

    // Function to handle clicking outside to close dropdowns
    const handleClickOutside = (event: MouseEvent) => {
        let isClickInsideDropdown = false;

        // Check if the click is on one of the dropdown buttons or contents
        Object.keys(isDropdownVisible).forEach(index => {
            const dropdownElement = document.getElementById(`dropdown-${index}`);
            if (dropdownElement && dropdownElement.contains(event.target as Node)) {
                isClickInsideDropdown = true;
            }
        });

        // If click is outside, close all dropdowns
        if (!isClickInsideDropdown) {
            setDropdownVisible({});
        }
    };

    // Toggle dropdown visibility
    const toggleDropdown = (index: number) => {
        setDropdownVisible(prevState => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    // Effect to add/remove click listener
    useEffect(() => {
    // Add when there's at least one dropdown open
        if (Object.values(isDropdownVisible).some(visibility => visibility)) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Cleanup
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownVisible]);

    return (
        <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-4 my-5">
            {/* Flex container for horizontal alignment */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                {/* Search Input */}
                <form className="flex items-center w-full sm:w-auto">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search recipe..." required />
                    </div>
                    <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Search
                    </button>
                </form>
                {/* Dropdown Buttons */}
                {["Dropdown 1", "Dropdown 2", "Dropdown 3"].map((dropdown, index) => (
                    <div key={index} className="relative" id={`dropdown-${index}`}>
                        <button
                            onClick={() => { toggleDropdown(index) }}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            {dropdown}
                            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 8l4 4 4-4" />
                            </svg>
                        </button>
                        {isDropdownVisible[index] && (
                            <div
                                className="absolute mt-2 w-44 bg-white rounded-md shadow-lg z-10"
                            >
                                <ul className="py-1 text-sm text-gray-700 dark:text-black">
                                    {dropdownOptions[index].map((option, optionIndex) => (
                                        <li key={optionIndex} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchComponent;
