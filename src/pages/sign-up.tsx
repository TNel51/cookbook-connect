import {useRouter} from "next/router";
import {signIn} from "next-auth/react";
import type {ReactElement} from "react";

export default function SignUp(): ReactElement {
    const router = useRouter();

    return (
        <>
            <section className="py-10">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="w-full bg-mute-black rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                                Create an account
                            </h1>
                            {router.query.error && <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    {decodeURIComponent(router.query.error as string)}
                                </div>
                            </div>}
                            <form className="space-y-4 md:space-y-6" action="/api/auth/register" method="post">
                                <div>
                                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-white">First name</label>
                                    <input type="text" name="firstName" id="firstName" className="bg-mute-grey border border-greyish text-white sm:text-sm rounded-lg focus:ring-basically-white focus:border-basically-white block w-full p-2.5" required={true} />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-white">Last name</label>
                                    <input type="text" name="lastName" id="lastName" className="bg-mute-grey border border-greyish text-white sm:text-sm rounded-lg focus:ring-basically-white focus:border-basically-white block w-full p-2.5" required={true} />
                                </div>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Username</label>
                                    <input type="text" name="username" id="username" className="bg-mute-grey border border-greyish text-white sm:text-sm rounded-lg focus:ring-basically-white focus:border-basically-white block w-full p-2.5" required={true} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
                                    <input type="email" name="email" id="email" className="bg-mute-grey border border-greyish text-white sm:text-sm rounded-lg focus:ring-basically-white focus:border-basically-white block w-full p-2.5" required={true} />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                    <input type="password" name="password" id="password" className="bg-mute-grey border border-greyish text-white sm:text-sm rounded-lg focus:ring-basically-white focus:border-basically-white block w-full p-2.5" required={true} />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-white">Confirm password</label>
                                    <input type="password" name="confirmedPassword" id="confirm-password" className="bg-mute-grey border border-greyish text-white sm:text-sm rounded-lg focus:ring-basically-white focus:border-basically-white block w-full p-2.5" required={true} />
                                </div>
                                <button type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-greyish rounded-lg focus:ring-4 focus:ring-basically-white hover:text-basically-white">
                                    Create an account
                                </button>
                                <p className="text-sm font-light text-gray-200">
                                    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/explicit-function-return-type */}
                                    Already have an account? <a href="#" onClick={async () => signIn()} className="font-medium text-gray-200 hover:text-basically-white">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
