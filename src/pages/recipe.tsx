import type {ReactElement} from "react";

import Rating from "@/components/Rating";
import type {Rating as RatingEntity} from "@/entities/rating.entity";

// import Comment from "@/components/comments";

export default function Recipe(): ReactElement {
    return <div>
        <h1>Recipe</h1>
        <br></br>
        
        <div className="relative z-0 w-full mb-5 group">
            <p>Recipe Name: Ham Sandwich</p>

            <br></br>

            <p>Category: Meal</p>

            <br></br>

            <p>Difficulty: Easy</p>

            <br></br>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                    Tools
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex justify-between">
                                    Toaster
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex justify-between">
                                    Knife
                            </td>
                        </tr>
                    </tbody>
                </table>

                <br></br>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                    Ingredient
                            </th>
                            <th scope="col" className="px-6 py-3">
                                    Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                    Unit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Bread
                            </td>
                            <td className="px-6 py-4">
                                    2
                            </td>
                            <td className="px-6 py-4">
                                    Slice
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Ham
                            </td>
                            <td className="px-6 py-4">
                                    8
                            </td>
                            <td className="px-6 py-4">
                                    Oz
                            </td>
                        </tr>
                    </tbody>
                </table>

                <br></br>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                    Tags
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex justify-between">
                                    Finger Food
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <br></br>

            <p>Instruction: <i>Placeholder Instructions</i> </p>

            <br></br>

            <p>Time Required: 10 minutes</p>

            <br></br>

            <form>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows={4} className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..."></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Post comment
                        </button>
                    </div>
                </div>
            </form>
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
            
    </div>;
}

