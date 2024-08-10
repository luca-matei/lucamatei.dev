"use client";
import {useEffect, useState} from 'react'
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import {
  faHome,
  faBook,
  faCode,
  faTimes,
  faBars,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TreeView from "./TreeView";

const navigation = [
  { name: 'Home', href: '/', icon: faHome, current: true },
  { name: 'Resources', href: '/resources', icon: faBook, current: false },
  { name: 'Projects', href: '/projects', icon: faCode, current: false },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

function LoadingNodes() {
  // Return a spinner with a label to the right that says "Loading categories"
  return (
    <div className="flex items-center rounded-md bg-blue-50 p-2">
      <svg className="animate-spin h-3.5 w-3.5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0c-4.418 0-8 3.582-8 8z"></path>
      </svg>
      <p className="ml-2 text-xs font-medium text-blue-800">Loading categories</p>
    </div>
  )
}

function FailedToFetchNodes() {
  return (
    <div className="flex items-center rounded-md bg-red-50 p-2">
      <FontAwesomeIcon icon={faXmarkCircle} className="h-3.5 w-3.5 text-red-400" aria-hidden="true" />
      <p className="ml-2 text-xs font-medium text-red-800">Failed to retrieve categories</p>
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [loadingNodes, setLoadingNodes] = useState(true);
  const [failedToFetchNodes, setFailedToFetchNodes] = useState(false);

  useEffect(() => {
    setCurrentNavigation(window.location.pathname)
    getNodes();
  }, [])

  function getNodes() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources/tree`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setNodes(data);
        setLoadingNodes(false);
      })
      .catch(() => {
        setLoadingNodes(false);
        setFailedToFetchNodes(true)
      })
  }

  function setCurrentNavigation(href: string) {
    navigation.forEach((item) => {
      item.current = item.href === href
    })
  }

  return (
      <div>
        <Dialog className="relative z-50 lg:hidden" open={sidebarOpen} onClose={setSidebarOpen}>
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                    <span className="sr-only">Close sidebar</span>
                    <FontAwesomeIcon icon={faTimes} className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                <div className="flex h-16 shrink-0 items-center">
                  <a href="/" className="font-semibold">lucamatei.dev</a>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-50 text-indigo-600'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                              )}
                            >
                              <FontAwesomeIcon icon={item.icon}
                                className={classNames(
                                  item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                  'h-6 w-6 shrink-0',
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <div className="text-xs font-semibold leading-6 text-gray-400">Categories</div>
                      {loadingNodes ? <LoadingNodes /> : <TreeView nodes={nodes} />}
                      {failedToFetchNodes && <FailedToFetchNodes />}
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center">
              <a href="/" className="font-semibold">lucamatei.dev</a>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                          )}
                        >
                          <FontAwesomeIcon icon={item.icon}
                            className={classNames(
                              item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0',
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">Categories</div>
                  {loadingNodes ? <LoadingNodes /> : <TreeView nodes={nodes} />}
                  {failedToFetchNodes && <FailedToFetchNodes />}
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard</div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </a>
        </div>

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
  );
}
