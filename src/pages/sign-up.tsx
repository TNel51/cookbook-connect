import type {AxiosError} from "axios";
import axios from "axios";
import {useRouter} from "next/router";
import {signIn, useSession} from "next-auth/react";
import type {FormEvent} from "react";
import {
    type ReactElement, useEffect, useState,
} from "react";
import {toast} from "react-toastify";

import Loading from "@/components/Loading";
import {passwordSchema} from "@/lib/passwordSchema";

export default function SignUp(): ReactElement {
    const session = useSession();
    const router = useRouter();

    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [displayName, setDisplayName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [submitError, setSubmitError] = useState<string | null>(null);

    useEffect(() => {
        if (session.data?.user) router.push("/")
            .catch(() => toast.error("Failed to redirect when logged in."));
    });

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        
        if (!displayName.length || !email.length || !password.length || password !== confirmPassword) return;

        const validationErrors = passwordSchema.validate(password, {details: true}) as Array<{message: string;}>;
        if (validationErrors.length) {
            setPasswordErrors((validationErrors as Array<{message: string;}>).map(err => err.message));
            return;
        }
        
        axios.post<unknown>(`/api/auth/register`, {
            displayName, email, password, confirmPassword,
        }).then(async () => {
            toast.success(`Welcome to Cookbook Connect!`);
            await signIn("credentials", {email, password});
        })
            .catch((error: AxiosError<string>): void => {
                toast.error(`Failed to register`);
                error.response?.data && setSubmitError(error.response.data);
            });
    };

    if (session.data?.user) return <Loading />;
    
    return <section>
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-8 m-4 space-y-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-md dark:border-gray-700">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                    Create an account
                </h1>
                {submitError && <div className="flex mt-2 text-red-600 dark:text-red-500 text-sm">
                    <svg className="w-4 h-4 min-w-4 max-w-4 min-h-4 max-h-4 my-auto me-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    {submitError}
                </div>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="displayName"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Display Name</label>
                        <input
                            type="text"
                            name="displayName"
                            id="displayName"
                            className="border text-sm rounded-lg block w-full p-2.5 bg-mute-grey border-greyish text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            value={displayName}
                            onChange={e => {
                                setDisplayName(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className={`border text-sm rounded-lg block w-full p-2.5 bg-mute-grey border-greyish text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${email.length >= 1 && "invalid:bg-red-50 invalid:border-red-500 invalid:text-red-900 invalid:placeholder-red-700 invalid:focus:ring-red-500 focus:border-red-500 dark:invalid:text-red-500 dark:invalid:placeholder-red-500 dark:invalid:border-red-500 dark:invalid:focus:border-red-500"}`}
                            required
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className={`block mb-2 text-sm font-medium ${passwordErrors.length ? "text-red-700 dark:text-red-500" : password.length >= 1 && !passwordErrors.length ? "text-green-700 dark:text-green-500" : "text-gray-900 dark:text-gray-300"}`}
                        >Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className={`${passwordErrors.length >= 1 ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" : password.length >= 1 && !passwordErrors.length ? "bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500 dark:text-green-400 dark:placeholder-green-500 dark:border-green-500" : "bg-mute-grey border-greyish text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"} border text-sm rounded-lg block w-full p-2.5`}
                            required
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value);

                                const valid = passwordSchema.validate(e.target.value, {details: true});
                                setPasswordErrors((valid as Array<{message: string;}>).map(err => err.message));
                            }}
                        />
                        {passwordErrors.length >= 1 && <div className="flex space-y-2 flex-col">
                            {passwordErrors.map((err, i) => <div key={i} className="flex mt-2 text-red-600 dark:text-red-500 text-sm">
                                <svg className="w-4 h-4 min-w-4 max-w-4 min-h-4 max-h-4 my-auto me-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                                {err}
                            </div>)}
                        </div>}
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className={`block mb-2 text-sm font-medium ${password !== confirmPassword ? "text-red-700 dark:text-red-500" : password.length >= 1 && password === confirmPassword ? "text-green-700 dark:text-green-500" : "text-gray-900 dark:text-gray-300"}`}
                        >Confirm Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className={`${password !== confirmPassword ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" : password.length >= 1 && password === confirmPassword ? "bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500 dark:text-green-400 dark:placeholder-green-500 dark:border-green-500" : "bg-mute-grey border-greyish text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"} border text-sm rounded-lg block w-full p-2.5`}
                            required
                            value={confirmPassword}
                            onChange={e => {
                                setConfirmPassword(e.target.value);
                            }}
                        />
                        {password !== confirmPassword && <div className="flex space-y-2 flex-col">
                            <div className="flex mt-2 text-red-600 dark:text-red-500 text-sm">
                                <svg className="w-4 h-4 min-w-4 max-w-4 min-h-4 max-h-4 my-auto me-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                                Passwords do not match.
                            </div>
                        </div>}
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >Create an account</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-300">
                        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/explicit-function-return-type */}
                        Already have an account? <a href="#" onClick={async () => signIn()} className="font-medium text-blue-700 hover:underline dark:text-blue-500">Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    </section>;
}
