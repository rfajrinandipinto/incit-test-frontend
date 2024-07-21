
"use client";

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    BellIcon,
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    Bars3Icon,
    UserIcon,
    XMarkIcon,
    PhotoIcon,
    UserCircleIcon,
    KeyIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation';

const navigation = [
    { name: 'Dashboard', href: 'dashboard', icon: HomeIcon, current: true },
    { name: 'Profile', href: 'profile', icon: UserIcon, current: false },
    { name: 'Reset Password', href: 'reset', icon: KeyIcon, current: false },

]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Sign out', href: '#' },
]

const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
]


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface User {
    email: string;
    createdAt: string;
    lastLogin: string;
    name: string;
    // Placeholder properties for the new requirements
    signUpTimestamp: string;
    loginCount: number;
    logoutTimestamp: string;
    updatedAt: string;
}

export default function Example() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [users, setUsers] = useState<User[]>([]); // Placeholder users array
    const [error, setError] = useState('');
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeSessionsToday: 0,
        averageActiveSessions: 0,
    }); // Placeholder statistics
    const router = useRouter();


    const getCookie = (name: string): string | null => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return null;
    };

    const handleLogout = async () => {

        const token = getCookie('token');
        if (!token) {
            router.push('/signin');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/signout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                // Redirect to sign-in page or show a success message
                router.push('/signin');
            } else {
                // Handle non-OK responses, possibly parsing JSON for a message
                const data = await response.json();
                console.error('Logout failed:', data.message || 'No error message provided');
                // Show error feedback to the user
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Show error feedback to the user
        }
    };

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setUsers(data.users)
                } else {
                    setError(data.message);
                }
            } catch (err) {
                console.error('Error during sign-in:', err);
                setError('An error occurred during sign-in.');
            }
        };
        fetchUserData();

        const fetchUserStatistic = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/statistics', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (response.ok) {

                    setStats(data)
                } else {
                    setError(data.message);
                }
            } catch (err) {
                console.error('Error during sign-in:', err);
                setError('An error occurred during sign-in.');
            }
        };
        fetchUserStatistic();



    }, []);

    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Panel className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex-shrink-0 flex items-center px-4">
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                        alt="Workflow"
                                    />
                                </div>
                                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                    <nav className="px-2 space-y-1">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                )}
                                            >
                                                <item.icon
                                                    className={classNames(
                                                        item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                                        'mr-4 flex-shrink-0 h-6 w-6'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
                        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                alt="Workflow"
                            />
                        </div>
                        <div className="flex-1 flex flex-col overflow-y-auto">
                            <nav className="flex-1 px-2 py-4 space-y-1">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                                'mr-3 flex-shrink-0 h-6 w-6'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </a>
                                ))}

                                <a
                                    key={'logout'}
                                    className={classNames(
                                        'text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                    )}
                                    onClick={handleLogout}
                                >
                                    <ArrowLeftIcon
                                        className={classNames(
                                            'text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6'
                                        )}
                                        aria-hidden="true"
                                    />
                                    Sign Out
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="md:pl-64 flex flex-col">
                    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
                        <button
                            type="button"
                            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="flex-1 px-4 flex justify-between">
                            <div className="flex-1 flex">
                                <form className="w-full flex md:ml-0" action="#" method="GET">
                                    <label htmlFor="search-field" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="search-field"
                                            className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                                            placeholder="Search"
                                            type="search"
                                            name="search"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="ml-4 flex items-center md:ml-6">
                                <button
                                    type="button"
                                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {userNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={item.href}
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <main className="flex-1 bg-white">
                        <div className="py-6">

                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                                <div className="sm:flex sm:items-center mb-5">
                                    <div className="sm:flex-auto">
                                        <h1 className="text-xl font-semibold text-gray-900">Statistic</h1>
                                    </div>

                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

                                    <div className="bg-gray-900 overflow-hidden shadow rounded-lg">
                                        <div className="px-4 py-5 sm:p-6">


                                            <div className="mt-4 flex items-end justify-center">
                                                <div>
                                                    <h4 className="text-3xl font-bold text-indigo-400 dark:text-white text-center">
                                                        {stats.totalUsers}
                                                    </h4>
                                                    <span className="text-sm text-white font-medium">Total Users</span>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-900 overflow-hidden shadow rounded-lg">
                                        <div className="px-4 py-5 sm:p-6">


                                            <div className="mt-4 flex items-end justify-center">
                                                <div>
                                                    <h4 className="text-3xl font-bold text-indigo-400 dark:text-white text-center">
                                                        {stats.activeSessionsToday}
                                                    </h4>
                                                    <span className="text-sm text-white font-medium">Active Today</span>
                                                </div>


                                            </div>
                                        </div>
                                    </div>


                                    <div className="bg-gray-900 overflow-hidden shadow rounded-lg">
                                        <div className="px-4 py-5 sm:p-6">


                                            <div className="mt-4 flex items-end justify-center">
                                                <div>
                                                    <h4 className="text-3xl font-bold text-indigo-400 dark:text-white text-center">
                                                        {stats.averageActiveSessions.toFixed(2)}
                                                    </h4>
                                                    <span className="text-sm text-white font-medium">Average Active Sessions</span>
                                                </div>


                                            </div>
                                        </div>
                                    </div>





                                </div>
                                <div className="sm:flex sm:items-center my-5">
                                    <div className="sm:flex-auto">
                                        <h1 className="text-xl font-semibold text-gray-900">Users</h1>
                                    </div>

                                </div>
                                <div className="px-4 sm:px-6 lg:px-8">

                                    <div className="mt-8 flex flex-col">
                                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div className="inline-block min-w-full py-2 align-middle">
                                                <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                                                    <table className="min-w-full divide-y divide-gray-300 rounded-lg overflow-hidden shadow">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">
                                                                    Name
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                    Email
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                    Sign Up Timestamp
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                    Logged In Count
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                    Logged Out Timestamp
                                                                </th>

                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-200 bg-white">
                                                            {users.map((user: User) => (
                                                                <tr key={user.name} >
                                                                    <td className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">
                                                                        {user.name || 'No Name Provided'}
                                                                    </td>
                                                                    <td className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                        {user.email}
                                                                    </td>
                                                                    <td className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                        {new Date(user.signUpTimestamp).toLocaleString()}
                                                                    </td>
                                                                    <td className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                        {user.loginCount}
                                                                    </td>
                                                                    <td className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                        {new Date(user.logoutTimestamp).toLocaleString()}
                                                                    </td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
