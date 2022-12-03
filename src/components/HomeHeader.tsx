import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between px-8 sm:px-0">
        <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-center">
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
        </div>
        <div className="absolute inset-y-0 right-6 flex items-center pr-2 sm:right-0">
          <Link
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white dark:focus:ring-cyan-800"
            href="/app"
          >
            <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-100 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
              Go to app
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
