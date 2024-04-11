import type {GetServerSidePropsContext} from "next";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/router";
import {getCsrfToken, useSession} from "next-auth/react";
import React, {useEffect} from "react";
import {toast} from "react-toastify";

import Loading from "@/components/Loading";

export default function SignIn({csrfToken}: {csrfToken: string | undefined;}): React.JSX.Element {
    const session = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const credentialsError = searchParams.get("error") === "CredentialsSignin";

    useEffect(() => {
        if (session.data?.user) router.push(searchParams.get("callbackUrl") ?? "/")
            .catch(() => toast.error("Failed to redirect when logged in."));
    });

    if (session.data?.user) return <Loading />;

    return <section>
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-8 m-4 space-y-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-md dark:border-gray-700">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                    Sign in to your account
                </h1>
                {credentialsError && <p className="text-sm text-red-500">Incorrect email or password</p>}
                <form className="space-y-4" method="post" action="/api/auth/callback/credentials">
                    <input name="csrfToken" type="hidden" value={csrfToken} />
                    <div>
                        <label
                            htmlFor="email"
                            className={`block mb-2 text-sm font-medium ${credentialsError ? "text-red-700 dark:text-red-500" : "text-gray-900 dark:text-gray-300"}`}
                        >Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className={`${credentialsError ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" : "bg-mute-grey border-greyish text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"} border text-sm rounded-lg block w-full p-2.5`}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className={`block mb-2 text-sm font-medium ${credentialsError ? "text-red-700 dark:text-red-500" : "text-gray-900 dark:text-gray-300"}`}
                        >Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className={`${credentialsError ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" : "bg-mute-grey border-greyish text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"} border text-sm rounded-lg block w-full p-2.5`}
                            required
                        />
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
    </section>;
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<unknown> {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}
