import {type ReactElement, useState} from "react";

export default function Register(): ReactElement {
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        const password = event.target.password.value;
        const passwordConfirm = event.target.passwordConfirm.value;

        setPasswordError(false);
        setPasswordErrorMessage("");

        if (password !== passwordConfirm) {
            setPasswordError(true);
            setPasswordErrorMessage("Passwords do not match.");
            return;
        }

        // Handle the sign-in logic here
    };

    return <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-sm p-6 m-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-md sm:p-8 dark:border-gray-700">
                <h5 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create Account</h5>
                <form className="space-y-6" action="#" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Enter Display Name</label>
                        <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="YourName123" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Enter Email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Enter Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div>
                        <label htmlFor="passwordConfirm" className={`block mb-2 text-sm font-medium ${passwordError ? "text-red-500" : "text-gray-900 dark:text-gray-300"}`}>Confirm Password</label>
                        <input
                            type="password"
                            name="passwordConfirm"
                            id="passwordConfirm"
                            placeholder="••••••••"
                            className={`bg-gray-50 border ${passwordError ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                            required
                        />
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordErrorMessage}</p>}
                    </div>

                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Already have an account? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Sign in</a>
                    </div>
                </form>
            </div>
        </div>
    </main>;
}
