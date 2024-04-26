import axios from "axios";
import {Modal} from "flowbite-react";
import {
    type ReactElement, useEffect, useState,
} from "react";
import {toast} from "react-toastify";
import useSWR from "swr";

import type {Tool} from "../../entities/tool.entity";
import {fetcher} from "../../lib/swrFetcher";

export default function AddToolModal({
    addTool,
    currentTools,
    openModal,
    setOpenModal,
}: {
    addTool: (tool: Tool) => void;
    currentTools: Tool[];
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}): ReactElement {
    const [tools, setTools] = useState<Tool[]>([]);
    const [toolsQuery, setToolsQuery] = useState<string | null>(null);
    const {data: toolsData, mutate: mutateTools} = useSWR<Tool[], Error>(
        toolsQuery ? ["/api/tools?key=", toolsQuery] : "/api/tools",
        fetcher,
    );

    useEffect(() => {
        if (!toolsData) return;
        setTools(toolsData);
    }, [toolsData]);

    const createTool = async (text: string): Promise<void> => {
        await axios.post<Tool>(`/api/tools`, {text}).then(async res => {
            toast.success(`Created new tool: ${res.data.text}`);
            await mutateTools();
        })
            .catch(() => { toast.error("Failed to create tool!") });
    };

    return <Modal dismissible show={openModal} onClose={() => { setOpenModal(false) }}>
        <Modal.Header>Add Tools</Modal.Header>
        <Modal.Body className="space-y-4">
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
                <div className="my-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white max-h-64 overflow-y-auto">
                    {tools?.length
                        ? tools.map(tool => <div  key={tool.id}>
                            {currentTools.some(ct => ct.id === tool.id)
                                ? <div className="flex px-2 py-1 border border-gray-200 text-green-300">
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
                        </div>)
                        : <div className="px-2 py-1 border border-gray-200" key={-1}>
                                {toolsQuery ? "No results." : "Search for a tool to add one."}
                            </div>}
                </div>
                {toolsQuery
                    // eslint-disable-next-line no-void
                    && <small>Don&apos;t see what you&apos;re looking for? <button type="button" onClick={() => { void createTool(toolsQuery) }} className="text-blue-300 font-bold">Create it instead.</button></small>}
            </div>
        </Modal.Body>
        <Modal.Footer>
            <button onClick={() => { setOpenModal(false) }} className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
        </Modal.Footer>
    </Modal>;
}
