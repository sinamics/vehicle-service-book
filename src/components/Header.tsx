import { User } from "@prisma/client";
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
    <header className="fixed z-40 justify-center px-6 shadow-lg navbar bg-base-300">
      <div className="navbar-start">
        {pathname !== "/auth/login" && (
          <>
            <button
              onClick={() => setOpened((prev) => !prev)}
              className="flex cursor-pointer flex-col items-start gap-1 btn btn-ghost group md:hidden">
              <span className="w-4 h-[2px] bg-current d-block transition" />
              <span
                className={
                  "w-4 h-[2px] bg-current d-block scale-x-50 origin-left transition group-focus:scale-x-100 group-hover:scale-x-100"
                }
              />
              <span className="bg-current d-block transition w-4 h-[2px]" />
            </button>
            <ul
              className={cx(
                "p-0 menu flex md:menu-horizontal absolute top-20 left-6 bg-base-300 rounded-lg transition duration-500 md:translate-y-0 md:static md:top-0 md:left-0 md:bg-transparent md:opacity-100",
                {
                  "opacity-0 -translate-y-6": !isDesktop && !opened,
                }
              )}>
              {links.map((link) => (
                <li key={link.id}>
                  <Link tabIndex={!isDesktop && !opened ? -1 : undefined} className="btn btn-ghost" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="navbar-center">
        <Link href="/" className="normal-case t ext-xl btn btn-ghost">
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
            <button title="Logout" className="btn btn-ghost" onClick={() => signOut()}>
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
