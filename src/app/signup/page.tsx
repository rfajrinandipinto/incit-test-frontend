// src/app/signup/page.tsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [validation, setValidation] = useState({
        length: false,
        lower: false,
        upper: false,
        digit: false,
        special: false,
        match: false,
    });
    const [formVisible, setFormVisible] = useState(true); // State for form visibility
    const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
    const router = useRouter();

    const validatePassword = (password: string, confirmPassword: string) => {
        const validationStatus = {
            length: password.length >= 8,
            lower: /[a-z]/.test(password),
            upper: /[A-Z]/.test(password),
            digit: /[0-9]/.test(password),
            special: /[!@#$%^&*]/.test(password),
            match: password === confirmPassword && password.length >= 8,
        };
        setValidation(validationStatus);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validation.match) {
            setError('Passwords do not match');
            return;
        }

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            setFormVisible(false); // Fade out the form
            setTimeout(() => {
                setModalOpen(true); // Open the modal after the form fades out
            }, 300); // Match the fade-out duration
        } else {
            setError(data.message);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        validatePassword(e.target.value, confirmPassword);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        validatePassword(password, e.target.value);
    };

    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-900">
            {/* Form Section */}
            <div className={`transition-opacity duration-300 ${formVisible ? 'opacity-100' : 'opacity-0'} ${formVisible ? '' : 'absolute inset-0'}`}>
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign up for a new account</h2>
                    <p className="mt-2 text-center text-sm text-white">
                        Or{' '}
                        <a href="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                            sign in to your account
                        </a>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={password}
                                        onChange={handlePasswordChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-sm font-medium text-gray-700">Password must contain:</h3>
                                <ul className="list-disc pl-5 text-sm text-gray-600">
                                    <li className={validation.length ? "text-green-500" : "text-red-500"}>
                                        At least 8 characters
                                    </li>
                                    <li className={validation.lower ? "text-green-500" : "text-red-500"}>
                                        At least one lowercase letter
                                    </li>
                                    <li className={validation.upper ? "text-green-500" : "text-red-500"}>
                                        At least one uppercase letter
                                    </li>
                                    <li className={validation.digit ? "text-green-500" : "text-red-500"}>
                                        At least one digit
                                    </li>
                                    <li className={validation.special ? "text-green-500" : "text-red-500"}>
                                        At least one special character
                                    </li>
                                    <li className={validation.match ? "text-green-500" : "text-red-500"}>
                                        Passwords must match
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign Up
                                </button>
                            </div>

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-3 gap-3">
                                    <div>
                                        <a
                                            href="#"
                                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            <span className="sr-only">Sign in with GitHub</span>
                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </a>
                                    </div>

                                    <div>
                                        <a
                                            href="#"
                                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            <span className="sr-only">Sign in with Google</span>
                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.285 15.957c-2.26 0-4.217-.76-5.818-2.05L2.54 15.8C4.39 18.07 7.8 19.26 11.435 19.26c6.553 0 11.853-5.364 11.853-11.962S17.988.336 11.435.336c-1.843 0-3.6.481-5.131 1.308l2.895 2.71c1.691-1.02 3.7-1.69 5.89-1.69 5.051 0 9.17 4.169 9.17 9.288s-4.12 9.308-9.17 9.308z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>




                        </form>
                    </div>
                </div>
            </div>

            {/* Modal Section */}
            <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4 text-center">
                    <Dialog.Panel className="max-w-sm p-6 mx-auto bg-white rounded transition-opacity duration-300 opacity-100">
                        <div className="flex justify-center">
                            <CheckIcon className="w-12 h-12 text-green-500" aria-hidden="true" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 text-center">Sign-Up Successful</h3>
                        <p className="mt-2 text-sm text-gray-500 text-center">
                            Please check your email for verification. Once verified, you will be able to access your account.
                        </p>
                        <div className="mt-4 flex justify-center">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                onClick={() => router.push('/')}
                            >
                                Go back to home
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}
