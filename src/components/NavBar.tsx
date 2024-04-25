import {Dropdown} from "flowbite";
import Image from "next/image";
import Link from "next/link";
import {
    signIn, signOut, useSession,
} from "next-auth/react";
import {
    createRef, type ReactElement, useEffect, useState,
} from "react";

export default function NavBar(): ReactElement {
    const {data: session} = useSession();
    const [dropdown, setDropdown] = useState<Dropdown>();
    
    const avaDropRef = createRef<HTMLDivElement>();
    const avaDropButtonRef = createRef<HTMLButtonElement>();
    
    useEffect(() => {
        if (!session?.user || !avaDropRef || !avaDropButtonRef || dropdown) return;

        setDropdown(new Dropdown(avaDropRef.current, avaDropButtonRef.current, {}));
    }, [avaDropRef, avaDropButtonRef, dropdown, session?.user]);
    
    return <div>
        <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image className="w-8 h-8 rounded-full dark:invert" src="/logo.svg" alt="Cookbook Connect Logo" height={32} width={32} />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Cookbook Connect</span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {session?.user
                        ? <>
                                <button ref={avaDropButtonRef} type="button" className="flex items-center bg-gray-100 text-sm dark:bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                    <span className="sr-only">Open user menu</span>
                                    {session?.user.image
                                        ? <Image
                                                src={session.user.image}
                                                className="w-8 h-8 rounded-full mr-2"
                                                alt="Open user menu"
                                                height="36"
                                                width="36"
                                            />
                                        : <div className="w-8 h-8 rounded-full p-1 mr-2 bg-slate-600 text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                                                </svg>
                                            </div>}
                                    <div className="flex text-sm m-auto">{session?.user.displayName}</div>
                                    <svg className="w-4 h-4 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                                <div ref={avaDropRef} className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-900 dark:text-white">{session?.user.displayName}</span>
                                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{session?.user.email}</span>
                                    </div>
                                    <ul className="py-2" aria-labelledby="user-menu-button">
                                        <li>
                                            <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</Link>
                                        </li>
                                        <li>
                                            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                                            <Link onClick={async () => signOut()} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign Out</Link>
                                        </li>
                                    </ul>
                                </div></>
                        : <>
                                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                                <button onClick={async () => signIn()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                            </>
                    }
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link href="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Recipes</Link>
                        </li>
                        <li>
                            <Link href="/my-recipes" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My Recipes</Link>
                        </li>
                        <li>
                            <Link href="/create-recipe" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Create Recipe</Link>
                        </li>
                        <li>
                            <Link href="/meal-plan" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Meal Planning</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>;
}
