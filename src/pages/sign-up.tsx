import {useRouter} from "next/router";
import {signIn} from "next-auth/react";
import {type ReactElement, useState} from "react";
import React from "react";

export default function SignUp(): ReactElement {
    const router = useRouter();
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const password = (event.currentTarget as HTMLFormElement).password.value as string;
        const passwordConfirm = (event.currentTarget as HTMLFormElement).passwordConfirm.value as string;

        // Your remaining logic

        setPasswordError(false);
        setPasswordErrorMessage("");

        if (password !== passwordConfirm) {
            setPasswordError(true);
            setPasswordErrorMessage("Passwords do not match.");
            return;
        }

        // Handle the sign-in logic here
    };
    
    return (
        <>
            <section className="py-10">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="w-full max-w-sm p-6 m-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-md sm:p-8 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                                Create an account
                            </h1>
                            {router.query.error && <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    {decodeURIComponent(router.query.error as string)}
                                </div>
                            </div>}
                            <form className="space-y-4 md:space-y-6" action="/api/auth/register" method="post" onSubmit={handleSubmit}>
                                
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
                                    <input type="text" name="username" id="username" className="bg-mute-grey border border-greyish text-gray-900 sm:text-sm rounded-lg focus:ring-basically-white focus:border-basically-white block w-full p-2.5" required={true} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                    <input type="email" name="email" id="email" className="bg-mute-grey border border-greyish text-gray-900 sm:text-sm rounded-lg focus:ring-basically-white focus:border-basically-white block w-full p-2.5" required={true} />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                                    <input type="password" name="password" id="password" className="bg-mute-grey border border-greyish text-gray-900 sm:text-sm rounded-lg focus:ring-basically-white focus:border-basically-white block w-full p-2.5" required={true} />
                                </div>
                                <div>
                                    <label htmlFor="passwordConfirm" className={`block mb-2 text-sm font-medium ${passwordError ? "text-red-500" : "text-gray-900 dark:text-gray-300"}`}>Confirm Password</label>
                                    <input
                                        type="password"
                                        name="passwordConfirm"
                                        id="passwordConfirm"
                                        className={`bg-gray-50 border ${passwordError ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                        required
                                    />
                                    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordErrorMessage}</p>}
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Create an account
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-300">
                                    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/explicit-function-return-type */}
                                    Already have an account? <a href="#" onClick={async () => signIn()} className="font-medium text-blue-700 hover:underline dark:text-blue-500">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
