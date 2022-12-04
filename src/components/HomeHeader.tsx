import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 shadow-sm shadow-primary">
      <div className="container relative flex h-16 items-center justify-between px-8">
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
        <nav className="absolute inset-y-0 right-8 flex items-center">
          <Link className="btn-primary btn" href="/app">
            Go to app
          </Link>
        </nav>
      </div>
    </header>
  );
}
