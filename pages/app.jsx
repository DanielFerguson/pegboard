import Head from 'next/head'
import Link from 'next/link'
import { Fragment, useCallback, useRef, useState, useEffect } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    HomeIcon,
    HeartIcon,
    MenuAlt2Icon,
    SearchIcon,
    XIcon,
    TicketIcon,
    HandIcon,
    FlagIcon
} from '@heroicons/react/outline'
import { GlobeIcon } from '@heroicons/react/solid'

const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon, current: false },
    { name: 'Dashboard', href: '#', icon: SearchIcon, current: true },
    // { name: 'Suggest', href: '#', icon: TicketIcon, current: false },
    // { name: 'Request', href: '#', icon: HandIcon, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const preventDefault = f => e => {
    e.preventDefault()
    f(e)
}

export default function App({ resources }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [records, setRecords] = useState(resources.records)

    const onChange = useCallback((event) => {
        const query = event.target.value;
        if (query.length) {
            let filteredRecords = records.filter(record => {
                if (
                    record.fields.Name.includes(query) ||
                    record.fields.Category.includes(query)
                ) return true;
            });
            setRecords(filteredRecords)
        } else {
            setRecords(resources.records)
        }
    })

    return (
        <div>
            <Head>
                <title>App | Pegboard</title>
                <meta name="description" content="A collection of resources, tools and collaborative means useful for you and your team to speed up development and delivery of exceptional experiences." />
                <meta name="keywords" content="tools,develop,developer,experience,knowledge,hub,find,discover,collaborate,alternative,speed" />
            </Head>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-40 flex md:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
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
                        <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
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
                                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-shrink-0 px-4 flex items-center">
                                <Link href="/">
                                    <a className="flex-shrink-0 px-4 flex items-center">
                                        <FlagIcon className="h-8 w-auto text-indigo-600" alt="Pegboard" />
                                        <h2 className="text-indigo-600 ml-3 font-bold text-2xl">Pegboard</h2>
                                    </a>
                                </Link>
                            </div>
                            <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                <nav className="px-2 space-y-1">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                'group rounded-md py-2 px-2 flex items-center text-base font-medium'
                                            )}
                                        >
                                            <item.icon
                                                className={classNames(
                                                    item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
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
                    <div className="flex-shrink-0 w-14">{/* Dummy element to force sidebar to shrink to fit close icon */}</div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white overflow-y-auto">
                    <Link href="/">
                        <a className="flex-shrink-0 px-4 flex items-center">
                            <FlagIcon className="h-8 w-auto text-indigo-600" alt="Pegboard" />
                            <h2 className="text-indigo-600 ml-3 font-bold text-2xl">Pegboard</h2>
                        </a>
                    </Link>
                    <div className="flex-grow mt-5 flex flex-col">
                        <nav className="flex-1 px-2 pb-4 space-y-1">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                        'group rounded-md py-2 px-2 flex items-center text-sm font-medium'
                                    )}
                                >
                                    <item.icon
                                        className={classNames(
                                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                            'mr-3 flex-shrink-0 h-6 w-6'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            <div className="md:pl-64">
                <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
                    <div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
                        <button
                            type="button"
                            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="flex-1 flex justify-between px-4 md:px-0">
                            <div className="flex-1 flex">
                                <form className="w-full flex md:ml-0" action="#" method="GET">
                                    <label htmlFor="search-field" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                                            <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="search-field"
                                            onChange={onChange}
                                            className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                                            placeholder="Search"
                                            type="search"
                                            name="search"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <main className="flex-1">
                        <div className="py-6">
                            <div className="px-4 sm:px-6 md:px-0">
                                <div className="py-4">
                                    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {records.map((resource) => (
                                            <li key={resource.fields.Name} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 flex flex-col justify-between">
                                                <div className="w-full flex items-center justify-between p-6 space-x-6">
                                                    <div className="flex-1 truncate">
                                                        <div className="flex items-center space-x-3">
                                                            <h3 className="text-gray-900 text-sm font-medium truncate">{resource.fields.Name}</h3>
                                                            <div className="mt-1 flex items-center gap-1 flex-wrap">
                                                                <span className="inline-block text-green-600 text-xs font-medium rounded-full">
                                                                    {resource.fields.Category}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <p className="mt-1 text-gray-500 text-sm truncate"><a href={resource.fields.Website} target="_blank" rel="noopener noreferrer">{resource.fields.Website}</a></p>
                                                        <div className="mt-2 flex items-center gap-1 flex-wrap">
                                                            {resource.fields.Tags && resource.fields.Tags.map((tag) => (
                                                                <span key={tag} className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <img className="w-10 h-10 rounded-full flex-shrink-0" src={"https://www.google.com/s2/favicons?domain=" + resource.fields.Website} alt={resource.fields.Name} />
                                                </div>
                                                <div>
                                                    <div className="-mt-px flex divide-x divide-gray-200">
                                                        <div className="-ml-px w-0 flex-1 flex">
                                                            <a
                                                                target="_blank" rel="noopener noreferrer"
                                                                href={"https://" + resource.fields.Website}
                                                                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                                                            >
                                                                <GlobeIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                                                <span className="ml-1 text-gray-800">View</span>
                                                            </a>
                                                        </div>
                                                        {
                                                            resource.fields.Documentation &&
                                                            <div className="-ml-px w-0 flex-1 flex">
                                                                <a
                                                                    href={"https://" + resource.fields.Documentation}
                                                                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                                                                >
                                                                    <HeartIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                                                    <span className="ml-1 text-gray-800">Docs</span>
                                                                </a>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export async function getStaticProps(context) {
    const res = await fetch("https://api.airtable.com/v0/appxe7XCZbEYPjSLp/Services", {
        headers: {
            'Authorization': 'Bearer ' + process.env.AIRTABLE_KEY,
        }
    });
    const resources = await res.json()

    if (!resources) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: { resources },
    }
}