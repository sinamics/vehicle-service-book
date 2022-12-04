import { Disclosure, Menu, Transition } from "@headlessui/react";
import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Fragment } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import { trpc } from "@/utils/trpc";

const links = [
  { name: "Dashboard", href: "/app", current: true },
  { name: "Cars", href: "/app/cars", current: false },
];

export default function Header() {
  const { data: user } = trpc.auth.getUser.useQuery();

  return (
    <Disclosure
      as="header"
      className="fixed inset-x-0 top-0 z-10 bg-gray-100 shadow-sm shadow-gray-300 dark:bg-gray-900 dark:shadow-gray-800"
    >
      {({ open }) => (
        <>
          <div className="container px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>

                  {open ? (
                    <FiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <Image
                      className="block h-8 w-11"
                      width={44}
                      height={32}
                      src="/favicon.svg"
                      alt="Car service book"
                    />
                  </Link>
                </div>
                <nav className="hidden sm:ml-6 sm:flex sm:flex-1 sm:justify-self-center">
                  <ul className="flex space-x-4">
                    {links.map((item) => (
                      <li className="flex" key={item.name}>
                        <Link
                          href={item.href}
                          className={cx(
                            item.current
                              ? "bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              : "text-gray-800 hover:bg-gray-300 hover:text-gray-800 dark:text-gray-200 hover:dark:bg-gray-700 hover:dark:text-gray-300",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <Menu.Button className="flex rounded-full bg-gray-800 text-sm transition-all hover:outline-none hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    {user?.image && (
                      <Image
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full"
                        src={user?.image}
                        alt=""
                      />
                    )}
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/"
                            className={cx(
                              active && "bg-gray-100 dark:bg-gray-600/30",
                              "block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/"
                            className={cx(
                              active && "bg-gray-100 dark:bg-gray-600/30",
                              "block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                            )}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => signOut()}
                            className={cx(
                              active && "bg-red-100 dark:bg-red-700/30",
                              "block w-full px-4 py-2 text-left text-sm text-red-700"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <Transition
            as={Fragment}
            enter="transition transition-[max-height] duration-300 ease-in"
            enterFrom="transform max-h-0"
            enterTo="transform max-h-screen"
            leave="transition transition-[max-height] duration-500 ease-out"
            leaveFrom="transform max-h-screen"
            leaveTo="transform max-h-0"
          >
            <Disclosure.Panel as="nav" className="overflow-hidden sm:hidden">
              <ul className="space-y-1 px-2 pt-2 pb-3">
                {links.map((item) => (
                  <li key={item.name} className="flex">
                    <Disclosure.Button
                      as={Link}
                      href={item.href}
                      className={cx(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current && "page"}
                    >
                      {item.name}
                    </Disclosure.Button>
                  </li>
                ))}
              </ul>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
