import Link from "next/link";

import Logo from "@/assets/images/svg/Logo.svg";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 bg-base-100 shadow-sm shadow-primary">
      <div className="container relative flex h-16 items-center justify-between px-8">
        <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-center">
          <div className="flex flex-shrink-0 items-center">
            <Link className="group flex items-center gap-3" href="/">
              <Logo className="h-8 w-8 group-hover:animate-spin-slow" />
              <div className="flex flex-col items-center">
                <span className="text-xl leading-5 tracking-wide">Vehicle</span>
                <span className="text-xs leading-[14px] tracking-tighter">
                  Service Book
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
