import type { User } from "@prisma/client";
import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";

import useMediaQuery from "@/hooks/useMediaQuery";

export type Link = {
  id: number;
  href: string;
  label: string;
};

type Props = {
  user?: Partial<User> | null;
  links: Link[];
};

const Header = ({ user, links }: Props) => {
  const [opened, setOpened] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { pathname } = useRouter();

  return (
    <header className="navbar bg-base-300 fixed z-40 justify-center px-6 shadow-lg">
      <div className="navbar-start">
        {pathname !== "/auth/login" && (
          <>
            <button
              onClick={() => setOpened((prev) => !prev)}
              className="btn btn-ghost group flex cursor-pointer flex-col items-start gap-1 md:hidden"
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
                "menu md:menu-horizontal bg-base-300 absolute top-20 left-6 flex rounded-lg p-0 transition duration-500 md:static md:top-0 md:left-0 md:translate-y-0 md:bg-transparent md:opacity-100",
                {
                  "-translate-y-6 opacity-0": !isDesktop && !opened,
                }
              )}
            >
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    tabIndex={!isDesktop && !opened ? -1 : undefined}
                    className="btn btn-ghost"
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
        <Link href="/" className="t ext-xl btn btn-ghost normal-case">
          Car Service Book
        </Link>
      </div>
      <div className="navbar-end">
        {user && pathname !== "/" && (
          <div className="flex items-center gap-3">
            {user.image ? (
              <Image
                className="rounded-full ring-2"
                src={user.image}
                width={36}
                height={36}
                alt={`Profile picture of ${user.name}`}
              />
            ) : null}
            <p>{user.name}</p>
            <button
              title="Logout"
              className="btn btn-ghost"
              onClick={() => signOut()}
            >
              <FiLogOut size={20} />
            </button>
          </div>
        )}
        {pathname === "/" && (
          <Link href="/app" className="btn btn-outline">
            Go to app
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
