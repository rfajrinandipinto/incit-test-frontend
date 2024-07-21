// src/app/verify-email/page.tsx
"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function VerifyEmail() {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams?.get('token');
            if (!token) {
                setError(true);
                setMessage('No token provided');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/auth/verify-email?token=${token}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Ensure cookies are included
                });
                const data = await response.json();

                if (response.ok && data.success) {
                    setSuccess(true);
                    setMessage('Email verified successfully');
                    setTimeout(() => router.push('/dashboard'), 2000); // Redirect to dashboard after 2 seconds
                } else {
                    setError(true);
                    setMessage(data.message || 'Verification failed');
                }
            } catch (err) {
                setError(true);
                setMessage('An error occurred during verification');
            }

            setLoading(false);
        };

        verifyEmail();
    }, [searchParams, router]);

    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {loading && (
                <div className="flex justify-center items-center h-full">
                    <svg
                        className="animate-spin h-8 w-8 text-indigo-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 1116 0A8 8 0 014 12z"
                        />
                    </svg>
                </div>
            )}
            {!loading && (
                <>
                    <Transition.Root show={success || error} as={Fragment}>
                        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => router.push('/')}>
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Dialog.Panel className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                </Transition.Child>

                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                    &#8203;
                                </span>

                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                        <div>
                                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                                {success ? (
                                                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                                ) : (
                                                    <XMarkIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                                )}
                                            </div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                    {success ? 'Email Verified!' : 'Verification Failed'}
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">{message}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5 sm:mt-6">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                                onClick={() => router.push('/')}
                                            >
                                                Go back to home
                                            </button>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition.Root>
                </>
            )}
        </div>
    );
}
