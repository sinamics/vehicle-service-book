import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";

import useMediaQuery from "@/hooks/useMediaQuery";
import { trpc } from "@/utils/trpc";

type HeaderLink = {
  id: number;
  href: string;
  label: string;
};

const links: Record<string, HeaderLink[]> = {
  home: [],
  app: [
    {
      id: 1,
      href: "/app",
      label: "Dashboard",
    },
    {
      id: 2,
      href: "/app/cars",
      label: "Cars",
    },
  ],
};

export default function Header() {
  const { pathname } = useRouter();
  const [opened, setOpened] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { data: user } = trpc.auth.getUser.useQuery();

  return (
    <header className="navbar fixed z-40 justify-center bg-base-300 px-6 shadow-lg">
      <div className="navbar-start">
        {pathname !== "/auth/login" && (
          <>
            <button
              onClick={() => setOpened((prev) => !prev)}
              className="group btn-ghost btn flex cursor-pointer flex-col items-start gap-1 md:hidden"
            >
              <span className="d-block h-[2px] w-4 bg-current transition" />
              <span
                className={
                  "d-block h-[2px] w-4 origin-left scale-x-50 bg-current transition group-hover:scale-x-100 group-focus:scale-x-100"
                }
              />
              <span className="d-block h-[2px] w-4 bg-current transition" />
            </button>
            <ul
              className={cx(
                "menu absolute top-20 left-6 flex rounded-lg bg-base-300 p-0 transition duration-500 md:static md:top-0 md:left-0 md:translate-y-0 md:bg-transparent md:opacity-100 md:menu-horizontal",
                {
                  "-translate-y-6 opacity-0": !isDesktop && !opened,
                }
              )}
            >
              {links[pathname === "/" ? "home" : "app"]?.map((link) => (
                <li key={link.id}>
                  <Link
                    tabIndex={!isDesktop && !opened ? -1 : undefined}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="navbar-center">
        <Link href="/" className="t ext-xl btn-ghost btn normal-case">
          Car Service Book
        </Link>
      </div>
      <div className="navbar-end">
        {user && pathname !== "/" && (
          <div className="flex items-center gap-3">
            {user.image && (
              <>
                <p>{user.name}</p>
                <Image
                  className="rounded-full ring-2"
                  src={user.image}
                  width={36}
                  height={36}
                  alt={`Profile picture of ${user.name}`}
                />
              </>
            )}
            <button
              title="Logout"
              className="btn-ghost btn"
              onClick={() => signOut()}
            >
              <FiLogOut size={20} />
            </button>
          </div>
        )}
        {pathname === "/" && (
          <Link href="/app" className="btn-outline btn">
            Go to app
          </Link>
        )}
      </div>
    </header>
  );
}
