import axios from "axios";
import {Modal} from "flowbite-react";
import {
    type ReactElement, useEffect, useState,
} from "react";
import {toast} from "react-toastify";
import useSWR from "swr";

import type {Tag} from "../../entities/tag.entity";
import {fetcher} from "../../lib/swrFetcher";

export default function AddTagModal({
    addTag,
    currentTags,
    openModal,
    setOpenModal,
}: {
    addTag: (tag: Tag) => void;
    currentTags: Tag[];
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}): ReactElement {
    const [tags, setTags] = useState<Tag[]>([]);
    const [tagsQuery, setTagsQuery] = useState<string | null>(null);
    const {data: tagsData, mutate: mutateTags} = useSWR<Tag[], Error>(
        tagsQuery ? ["/api/tags?key=", tagsQuery] : "/api/tags",
        fetcher,
    );

    useEffect(() => {
        if (!tagsData) return;
        setTags(tagsData);
    }, [tagsData]);

    const createTag = async (code: string): Promise<void> => {
        await axios.post<Tag>(`/api/tags`, {code}).then(async res => {
            toast.success(`Created new tag: ${res.data.code}`);
            await mutateTags();
        })
            .catch(() => { toast.error("Failed to create tag!") });
    };

    return <Modal dismissible show={openModal} onClose={() => { setOpenModal(false) }}>
        <Modal.Header>Add Tags</Modal.Header>
        <Modal.Body className="space-y-4">
            <div>
                <label htmlFor="tagModalName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag</label>
                <input
                    type="text"
                    name="tagModalName"
                    id="tagModalName"
                    onChange={e => { setTagsQuery(e.target.value) }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search for a Tag"
                    required={true} />
            </div>
            <div>
                <label htmlFor="tagModalName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Results</label>
                <div className="my-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white max-h-64 overflow-y-auto">
                    {tags?.length
                        ? tags.map(tag => <div  key={tag.id}>
                            {currentTags.some(ct => ct.id === tag.id)
                                ? <div className="flex px-2 py-1 border border-gray-200 text-green-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <div className="my-auto ms-2">
                                            {tag.code}
                                        </div>
                                    </div>
                                : <div
                                        className="flex px-2 py-1 border border-gray-200 hover:bg-gray-200 cursor-pointer"
                                        key={tag.id}
                                        onClick={() => { addTag(tag) }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <div className="my-auto ms-2">
                                            {tag.code}
                                        </div>
                                    </div>}
                        </div>)
                        : <div className="px-2 py-1 border border-gray-200" key={-1}>
                                {tagsQuery ? "No results." : "Search for a tag to add one."}
                            </div>}
                </div>
                {tagsQuery
                        // eslint-disable-next-line no-void
                        && <small>Don&apos;t see what you&apos;re looking for? <button type="button" onClick={() => { void createTag(tagsQuery) }} className="text-blue-300 font-bold">Create it instead.</button></small>}
            </div>
        </Modal.Body>
        <Modal.Footer>
            <button onClick={() => { setOpenModal(false) }} className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
        </Modal.Footer>
    </Modal>;
}
