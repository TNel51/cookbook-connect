import type {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import Link from "next/link";
import {getCsrfToken} from "next-auth/react";

export default function SignIn({csrfToken}: InferGetServerSidePropsType<typeof getServerSideProps>): unknown  {
    return (
        <section className="pt-32">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-mute-black rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                                Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" method="post" action="/api/auth/callback/credentials">
                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                            <div>
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-white">Email</label>
                                <input type="text" name="email" id="email" className="bg-mute-grey border border-greyish text-white sm:text-sm rounded-lg focus:ring-basically-white focus:border-basically-white block w-full p-2.5" required={true} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input type="password" name="password" id="password" className="bg-mute-grey border border-greyish text-white sm:text-sm rounded-lg focus:ring-basically-white focus:border-basically-white block w-full p-2.5" required={true} />
                            </div>
                            <button type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-greyish rounded-lg focus:ring-4 focus:ring-basically-white hover:text-basically-white">
                                    Sign in
                            </button>
                            <p className="text-sm font-light text-gray-200">
                                    Don’t have an account yet? <Link href="/sign-up" className="font-medium text-gray-200 hover:text-basically-white">Sign up</Link>
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
