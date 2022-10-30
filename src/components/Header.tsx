import cx from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import useMediaQuery from "@/hooks/useMediaQuery";

const links = [
  {
    id: 1,
    href: "/",
    label: "Item 1",
  },
  {
    id: 2,
    href: "/",
    label: "Item 2",
  },
  {
    id: 3,
    href: "/",
    label: "Item 3",
  },
];

const Header = ({ ...props }) => {
  const [opened, setOpened] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { pathname } = useRouter();

  return (
    <header className={"fixed justify-center navbar bg-base-3 shadow-lg"} {...props}>
      <div className={"navbar-start"}>
        {pathname === "/" ? (
          <>
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
                "p-0 menu flex md:menu-horizontal absolute top-20 left-2 bg-base-300 rounded-lg transition duration-500 md:translate-y-0 md:static md:top-0 md:left-0 md:bg-transparent md:opacity-100",
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
          </>
        ) : null}
      </div>
      <div className={"navbar-center"}>
        <Link href={"/"} className={"normal-case t ext-xl btn btn-ghost"}>
          Car Service Book
        </Link>
      </div>
      <div className={"navbar-end"}>
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
