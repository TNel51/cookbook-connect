import {
    type ReactElement, useEffect, useState,
} from "react";
import useSWR from "swr";

import type {Tool} from "../../entities/tool.entity";
import {fetcher} from "../../lib/swrFetcher";

export default function AddToolModal({addTool, currentTools}: {addTool: (tool: Tool) => void; currentTools: Tool[];}): ReactElement {
    const [tools, setTools] = useState<Tool[]>([]);
    const [toolsQuery, setToolsQuery] = useState<string | null>(null);
    const {data: toolsData} = useSWR<Tool[], Error>(
        toolsQuery ? ["/api/tools?key=", toolsQuery] : null,
        fetcher,
    );

    useEffect(() => {
        if (!toolsData) return;
        setTools(toolsData);
    }, [toolsData]);

    return <div id="toolsModal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full bg-black/50">
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Add Tool
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="toolsModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="grid gap-4">
                    <div>
                        <label htmlFor="toolModalName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tool</label>
                        <input
                            type="text"
                            name="toolModalName"
                            id="toolModalName"
                            onChange={e => { setToolsQuery(e.target.value) }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Search for a Tool"
                            required={true} />
                    </div>
                    <div>
                        <label htmlFor="toolModalName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Results</label>
                        <div className="my-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white max-h-64 overflow-y-hidden overflow-y-auto">
                            {tools?.length
                                ? tools.map(tool => <>
                                    {currentTools.some(ct => ct.id === tool.id)
                                        ? <div className="flex px-2 py-1 border border-gray-200 text-green-300" key={tool.id}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                <div className="my-auto ms-2">
                                                    {tool.text}
                                                </div>
                                            </div>
                                        : <div
                                                className="flex px-2 py-1 border border-gray-200 hover:bg-gray-200 cursor-pointer"
                                                key={tool.id}
                                                onClick={() => { addTool(tool) }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                <div className="my-auto ms-2">
                                                    {tool.text}
                                                </div>
                                            </div>}
                                </>)
                                : <div className="px-2 py-1 border border-gray-200">
                                        {toolsQuery ? "No results." : "Search for a tool to add one."}
                                    </div>}
                        </div>
                        <small>Don&apos;t see what you&apos;re looking for? <button type="button" className="text-blue-300 font-bold">Create it instead.</button></small>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
