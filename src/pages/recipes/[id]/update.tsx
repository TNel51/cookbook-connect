import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type {AxiosError} from "axios";
import axios from "axios";
import NextError from "next/error";
import {useParams} from "next/navigation";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import type {FormEvent} from "react";
import {
    type ReactElement, useEffect, useState,
} from "react";
import {toast} from "react-toastify";
import useSWR from "swr";

import AddIngredientModal from "../../../components/CreateRecipe/AddIngredientModal";
import AddTagModal from "../../../components/CreateRecipe/AddTagModel";
import AddToolModal from "../../../components/CreateRecipe/AddToolModal";
import Loading from "../../../components/Loading";
import type {BaseEntityFields} from "../../../entities/base-entity";
import type {Ingredient} from "../../../entities/ingredient.entity";
import type {
    Recipe as RecipeEntity, RecipeCategory, RecipeDifficulty,
} from "../../../entities/recipe.entity";
import type {RecipeIngredient} from "../../../entities/recipe-ingredient.entity";
import type {Tag} from "../../../entities/tag.entity";
import type {Tool} from "../../../entities/tool.entity";
import {fetcher} from "../../../lib/swrFetcher";

export default function UpdateRecipe(): ReactElement {
    const session = useSession();
    const router = useRouter();
    const params = useParams<{id: string;}>() as {id: string;} | undefined;
    const {
        data: recipe, isLoading, error,
    } = useSWR<RecipeEntity, Error>(params?.id ? `/api/recipes/${params.id}` : undefined, fetcher);

    const [isPublic, setPublic] = useState<boolean>(false);
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [category, setCategory] = useState<RecipeCategory>();
    const [difficulty, setDifficulty] = useState<RecipeDifficulty>();
    const [instructions, setInstructions] = useState<string>();
    const [time, setTime] = useState<string>();

    const [tools, setTools] = useState<Tool[]>([]);
    const [ingredients, setIngredients] = useState<Array<Omit<RecipeIngredient, BaseEntityFields | "recipe" | "recipeId">>>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);

    const [toolModalOpen, setToolModalOpen] = useState<boolean>(false);
    const [ingredientModalOpen, setIngredientModalOpen] = useState<boolean>(false);
    const [tagModalOpen, setTagModalOpen] = useState<boolean>(false);

    const updateRecipe = (e: FormEvent): void => {
        if (!params?.id) return;
        e.preventDefault();
        setSubmitDisabled(true);
        
        axios.patch<RecipeEntity>(`/api/recipes/${params.id}`, {
            public: isPublic,
            title: title,
            description: description,
            category: category,
            difficulty: difficulty,
            instructions: instructions,
            time: time,
            tags: tags.map(t => t.id),
            tools: tools.map(t => t.id),
            ingredients: ingredients.map(i => ({
                ingredientId: i.ingredientId, quantity: i.quantity, required: i.required,
            })),
        }).then(async () => {
            toast.success(`Successfully saved recipe.`);
            setSubmitDisabled(false);
        })
            .catch((err: AxiosError): void => {
                toast.error(err.response?.data ? `Failed to update recipe: ${err.response.data as string}` : `Failed to update recipe.`);
                setSubmitDisabled(false);
            });
    };

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline.configure(),
            TextStyle,
            Color,
            Placeholder.configure({
                emptyEditorClass: "is-editor-empty",
                placeholder: "Write some instructions!",
            }),
        ],
        editorProps: {
            attributes: {
                class: "prose dark:prose-invert w-full max-w-full prose-sm mx-auto focus:outline-none",
            },
        },
        content: instructions,
        onUpdate: e => { setInstructions(e.editor.getHTML()) },
    });
    
    useEffect(() => {
        if (session.status === "unauthenticated") router.push("/sign-in")
            .catch(() => toast.error("Failed to redirect when not logged in."));
    });

    useEffect(() => {
        if (!recipe || !editor) return;

        setPublic(recipe.public);
        setTitle(recipe.title);
        setDescription(recipe.description);
        setCategory(recipe.category);
        setDifficulty(recipe.difficulty);
        setInstructions(recipe.instructions);
        editor.commands.setContent(recipe.instructions);
        setTime(recipe.time);
        setTools(recipe.tools);
        setIngredients(recipe.ingredients);
        setTags(recipe.tags);
    }, [recipe, editor]);

    if (session.status !== "authenticated") return <Loading />;

    if (isLoading || !recipe) return <div className="flex max-w-20 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <circle fill="#266BFF" stroke="#266BFF" strokeWidth="15" r="15" cx="40" cy="65">
                <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
            </circle>
            <circle fill="#266BFF" stroke="#266BFF" strokeWidth="15" r="15" cx="100" cy="65">
                <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
            </circle>
            <circle fill="#266BFF" stroke="#266BFF" strokeWidth="15" r="15" cx="160" cy="65">
                <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
            </circle>
        </svg>
    </div>;

    if (error) return <div>Failed to load recipe!</div>;
    
    if (session.data.user.id !== recipe.creatorId) return <NextError statusCode={403} title="Cannot access recipe" />;

    return <>
        <section className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Recipe</h2>
            <form className="mx-auto" onSubmit={updateRecipe}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-4">
                    <div className="sm:col-span-2">
                        <div className="flex items-center me-4">
                            <input id="public" type="checkbox" checked={isPublic} onChange={e => { setPublic(e.target.checked) }} className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="public" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Recipe is Public</label>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipe Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Type recipe title"
                            value={title}
                            onChange={e => { setTitle(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea
                            id="description"
                            rows={4}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Super simple recipe! Everyone will enjoy!"
                            value={description}
                            onChange={e => { setDescription(e.target.value) }}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <select
                            id="category"
                            name="category"
                            defaultValue=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={category}
                            onChange={e => { setCategory(e.target.value as RecipeCategory) }}
                            required
                        >
                            <option value="" disabled>Select category</option>
                            <option value="Snack">Sanck</option>
                            <option value="Appetizer">Appetizer</option>
                            <option value="Meal">Meal</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Side">Side</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="difficulty" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Difficulty</label>
                        <select
                            id="difficulty"
                            name="difficulty"
                            defaultValue=""
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={difficulty}
                            onChange={e => { setDifficulty(e.target.value as RecipeDifficulty) }}
                            required
                        >
                            <option value="" disabled>Select difficulty</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Difficult">Difficult</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-6 py-3 flex justify-between">
                                        <div className="my-auto">Tools</div>
                                        <button type="button" onClick={() => { setToolModalOpen(!toolModalOpen) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tools.length
                                    ? tools.map(tool => <tr key={tool.id} className="bg-white border-y dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex justify-between">
                                            <div className="my-auto">{tool.text}</div>
                                            <button type="button" onClick={() => { setTools(tools.filter(t => t.id !== tool.id)) }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>)
                                    : <tr className="bg-white border-y dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-400 whitespace-nowrap flex justify-between">
                                                <div className="my-auto italic">There aren&apos;t any tools. Add some!</div>
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="sm:col-span-2">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-6 py-3">
                                        <div className="my-auto">Ingredient</div>
                                    </th>
                                    <th className="px-6 py-3 flex justify-between">
                                        <div className="my-auto">Quantity</div>
                                        <button type="button" onClick={() => { setIngredientModalOpen(!ingredientModalOpen) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {ingredients.length
                                    ? ingredients.map(ingredient => <tr key={ingredient.ingredientId} className="bg-white border-y dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {ingredient.ingredient.text}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex justify-between">
                                            <div className="my-auto me-2">
                                                <input
                                                    type="text"
                                                    id="ingrQuantity"
                                                    defaultValue={ingredient.quantity}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="1/2 tbsp."
                                                    required
                                                    onChange={e => {
                                                        const ingr = ingredients.find(i => i.ingredientId === ingredient.ingredientId);
                                                        if (!ingr) throw Error("Somehow couldn't find ingredient!");
                                                        ingr.quantity = e.target.value;
                                                        setIngredients(ingredients);
                                                    }}
                                                />
                                            </div>
                                            <button type="button" onClick={() => { setIngredients(ingredients.filter(t => t.ingredient.id !== ingredient.ingredient.id)) }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>)
                                    : <tr className="bg-white border-y dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-400 whitespace-nowrap" colSpan={2}>
                                                <div className="my-auto italic">There aren&apos;t any ingredients. Add some!</div>
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="sm:col-span-2">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-6 py-3 flex justify-between">
                                        <div className="my-auto">Tags</div>
                                        <button type="button" onClick={() => { setTagModalOpen(!tagModalOpen) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tags.length
                                    ? tags.map(tag => <tr key={tag.id} className="bg-white border-y dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex justify-between">
                                            <div className="my-auto">{tag.code}</div>
                                            <button type="button" onClick={() => { setTags(tags.filter(t => t.id !== tag.id)) }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>)
                                    : <tr className="bg-white border-y dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-400 whitespace-nowrap flex justify-between">
                                                <div className="my-auto italic">There aren&apos;t any tags. Add some!</div>
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="difficulty" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instructions</label>
                        {editor
                            ? <div className="sm:col-span-2 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                    <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                                        <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                                            <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                                                <input
                                                    type="color"
                                                    onChange={e => editor.chain().focus()
                                                        .setColor(e.target.value)
                                                        .run()}
                                                    value={editor.getAttributes("textStyle").color as string}
                                                    data-testid="setColor"
                                                    className="w-8 h-8 bg-transparent"
                                                />
                                                <button
                                                    type="button"
                                                    className={`${editor.isActive("bold") ? "bg-slate-300" : ""} p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600`}
                                                    onClick={() => editor.chain().focus()
                                                        .toggleBold()
                                                        .run()}
                                                    disabled={
                                                        !editor.can()
                                                            .chain()
                                                            .focus()
                                                            .toggleBold()
                                                            .run()
                                                    }
                                                >
                                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0-7H6m2 7h6.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0H6"/>
                                                    </svg>
                                                    <span className="sr-only">Bold</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`${editor.isActive("italic") ? "bg-slate-300" : ""} p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400`}
                                                    onClick={() => editor.chain().focus()
                                                        .toggleItalic()
                                                        .run()}
                                                    disabled={
                                                        !editor.can()
                                                            .chain()
                                                            .focus()
                                                            .toggleItalic()
                                                            .run()
                                                    }
                                                >
                                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8.874 19 6.143-14M6 19h6.33m-.66-14H18"/>
                                                    </svg>
                                                    <span className="sr-only">Italic</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`${editor.isActive("underline") ? "bg-slate-300" : ""} p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400`}
                                                    onClick={() => editor.chain().focus()
                                                        .toggleUnderline()
                                                        .run()}
                                                    disabled={
                                                        !editor.can()
                                                            .chain()
                                                            .focus()
                                                            .toggleUnderline()
                                                            .run()
                                                    }
                                                >
                                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 19h12M8 5v9a4 4 0 0 0 8 0V5M6 5h4m4 0h4"/>
                                                    </svg>
                                                    <span className="sr-only">Underline</span>
                                                </button>
                                            </div>
                                            <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                                                <button
                                                    type="button"
                                                    className={`${editor.isActive("paragraph") ? "bg-slate-300" : ""} p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400`}
                                                    onClick={() => editor.chain().focus()
                                                        .setParagraph()
                                                        .run()}
                                                    disabled={
                                                        !editor.can()
                                                            .chain()
                                                            .focus()
                                                            .setParagraph()
                                                            .run()
                                                    }
                                                >
                                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v7m0 7v-7m4-7v14m3-14H8.5A3.5 3.5 0 0 0 5 8.5v0A3.5 3.5 0 0 0 8.5 12H12"/>
                                                    </svg>
                                                    <span className="sr-only">Paragraph</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`${editor.isActive("heading", {level: 1}) ? "bg-slate-300" : ""} p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400`}
                                                    onClick={() => editor.chain().focus()
                                                        .toggleHeading({level: 1})
                                                        .run()}
                                                    disabled={
                                                        !editor.can()
                                                            .chain()
                                                            .focus()
                                                            .toggleHeading({level: 1})
                                                            .run()
                                                    }
                                                >
                                                    <div className="w-4 leading-4 text-sm text-center">h1</div>
                                                    <span className="sr-only">Heading 1</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`${editor.isActive("heading", {level: 2}) ? "bg-slate-300" : ""} p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400`}
                                                    onClick={() => editor.chain().focus()
                                                        .toggleHeading({level: 2})
                                                        .run()}
                                                    disabled={
                                                        !editor.can()
                                                            .chain()
                                                            .focus()
                                                            .toggleHeading({level: 2})
                                                            .run()
                                                    }
                                                >
                                                    <div className="w-4 leading-4 text-sm text-center">h2</div>
                                                    <span className="sr-only">Heading 2</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`${editor.isActive("heading", {level: 3}) ? "bg-slate-300" : ""} p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400`}
                                                    onClick={() => editor.chain().focus()
                                                        .toggleHeading({level: 3})
                                                        .run()}
                                                    disabled={
                                                        !editor.can()
                                                            .chain()
                                                            .focus()
                                                            .toggleHeading({level: 3})
                                                            .run()
                                                    }
                                                >
                                                    <div className="w-4 leading-4 text-sm text-center">h3</div>
                                                    <span className="sr-only">Heading 3</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`${editor.isActive("heading", {level: 4}) ? "bg-slate-300" : ""} p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400`}
                                                    onClick={() => editor.chain().focus()
                                                        .toggleHeading({level: 4})
                                                        .run()}
                                                    disabled={
                                                        !editor.can()
                                                            .chain()
                                                            .focus()
                                                            .toggleHeading({level: 4})
                                                            .run()
                                                    }
                                                >
                                                    <div className="w-4 leading-4 text-sm text-center">h4</div>
                                                    <span className="sr-only">Heading 4</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`${editor.isActive("heading", {level: 5}) ? "bg-slate-300" : ""} p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400`}
                                                    onClick={() => editor.chain().focus()
                                                        .toggleHeading({level: 5})
                                                        .run()}
                                                    disabled={
                                                        !editor.can()
                                                            .chain()
                                                            .focus()
                                                            .toggleHeading({level: 5})
                                                            .run()
                                                    }
                                                >
                                                    <div className="w-4 leading-4 text-sm text-center">h5</div>
                                                    <span className="sr-only">Heading 5</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`${editor.isActive("heading", {level: 6}) ? "bg-slate-300" : ""} p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400`}
                                                    onClick={() => editor.chain().focus()
                                                        .toggleHeading({level: 6})
                                                        .run()}
                                                    disabled={
                                                        !editor.can()
                                                            .chain()
                                                            .focus()
                                                            .toggleHeading({level: 6})
                                                            .run()
                                                    }
                                                >
                                                    <div className="w-4 leading-4 text-sm text-center">h6</div>
                                                    <span className="sr-only">Heading 6</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`${editor.isActive("bulletList") ? "bg-slate-300" : ""} p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400`}
                                                    onClick={() => editor.chain().focus()
                                                        .toggleBulletList()
                                                        .run()}
                                                    disabled={
                                                        !editor.can()
                                                            .chain()
                                                            .focus()
                                                            .toggleBulletList()
                                                            .run()
                                                    }
                                                >
                                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"/>
                                                    </svg>
                                                    <span className="sr-only">Bullet List</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`${editor.isActive("orderedList") ? "bg-slate-300" : ""} p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400`}
                                                    onClick={() => editor.chain().focus()
                                                        .toggleOrderedList()
                                                        .run()}
                                                    disabled={
                                                        !editor.can()
                                                            .chain()
                                                            .focus()
                                                            .toggleOrderedList()
                                                            .run()
                                                    }
                                                >
                                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"/>
                                                    </svg>
                                                    <span className="sr-only">Ordered List</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                                        <label htmlFor="editor" className="sr-only">Publish post</label>
                                        <EditorContent className="" editor={editor} />
                                    </div>
                                </div>
                            : <div>Loading...</div>}
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="timeRequired" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time Required</label>
                        <input
                            type="text"
                            name="timeRequired"
                            id="timeRequired"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="45 minutes"
                            value={time}
                            onChange={e => { setTime(e.target.value) }}
                            required
                        />
                    </div>
                </div>
                <button type="submit" disabled={submitDisabled} className="disabled:cursor-not-allowed disabled:bg-slate-500 disabled:hover:bg-slate-500 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
            </form>
        </section>
        <AddToolModal
            addTool={(tool: Tool) => { if (!tools.some(t => t.id === tool.id)) setTools([...tools, tool]); }}
            currentTools={tools}
            openModal={toolModalOpen}
            setOpenModal={setToolModalOpen}
        />
        <AddIngredientModal
            addIngredient={(ingredient: Ingredient) => {
                if (!ingredients.some(t => t.ingredient.id === ingredient.id)) setIngredients([...ingredients, {
                    ingredient: ingredient, ingredientId: ingredient.id, quantity: "", required: true,
                } ]);
            }}
            currentIngredients={ingredients.map(i => i.ingredient)}
            openModal={ingredientModalOpen}
            setOpenModal={setIngredientModalOpen}
        />
        <AddTagModal
            addTag={(tag: Tag) => { if (!tags.some(t => t.id === tag.id)) setTags([...tags, tag]); }}
            currentTags={tags}
            openModal={tagModalOpen}
            setOpenModal={setTagModalOpen}
        />
    </>;
}
