import type {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {getCsrfToken} from "next-auth/react";

export default function SignIn({csrfToken}: InferGetServerSidePropsType<typeof getServerSideProps>): unknown  {
    const searchParams = useSearchParams();
    console.log(searchParams.get("error"));
    return (
        <section className="pt-32">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full max-w-sm p-6 m-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-md sm:p-8 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                                Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" method="post" action="/api/auth/callback/credentials">
                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                            <div>
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                <input type="text" name="email" id="email" className="bg-mute-grey border border-greyish text-gray-900 sm:text-sm rounded-lg focus:ring-basically-white focus:border-basically-white block w-full p-2.5" required={true} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                                <input type="password" name="password" id="password" className="bg-mute-grey border border-greyish text-gray-900 sm:text-sm rounded-lg focus:ring-basically-white focus:border-basically-white block w-full p-2.5" required={true} />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Sign in
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-300">
                                    Don’t have an account yet? <Link href="/sign-up" className="font-medium text-blue-700 hover:underline dark:text-blue-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<unknown> {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}
