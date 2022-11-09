import { User } from "@prisma/client";
import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useState } from "react";

import useMediaQuery from "@/hooks/useMediaQuery";

type Link = {
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
    <header className={"fixed justify-center navbar bg-base-300 z-10 shadow-lg px-6"}>
      <div className={"navbar-start"}>
        <button
          onClick={() => setOpened((prev) => !prev)}
          className={"flex flex-col items-start gap-1 cursor-pointer btn btn-ghost group md:hidden"}>
          <span className={"w-4 h-[2px] bg-current d-block transition"} />
          <span
            className={
              "w-4 h-[2px] bg-current d-block scale-x-50 origin-left transition group-focus:scale-x-100 group-hover:scale-x-100"
            }
          />
          <span className={"w-4 h-[2px] bg-current d-block transition"} />
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
              <Link tabIndex={!isDesktop && !opened ? -1 : undefined} className={"btn btn-ghost"} href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={"navbar-center"}>
        <Link href={"/"} className={"normal-case t ext-xl btn btn-ghost"}>
          Car Service Book
        </Link>
      </div>
      <div className={"navbar-end"}>
        {user && pathname !== "/" ? (
          <div className={"flex gap-3 items-center"}>
            {user.image ? (
              <Image
                className={"rounded-full ring-2"}
                src={user.image}
                width={36}
                height={36}
                alt={`Profile picture of ${user.name}`}
              />
            ) : null}
            <p>{user.name}</p>
            <button className={"btn btn-outline"} onClick={() => signOut()}>
              Logout
            </button>
          </div>
        ) : null}
        {pathname === "/" ? (
          <Link href={"/app"} className={"btn btn-outline"}>
            Go to app
          </Link>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
