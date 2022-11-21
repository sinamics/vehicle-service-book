import { Navbar, Text, User } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";

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
  const { data: user } = trpc.auth.getUser.useQuery();

  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Brand>
        <Image
          style={{ marginRight: "1rem" }}
          src="/favicon.svg"
          width={50}
          height={50}
          alt=""
        />
        <Text b color="inherit" hideIn="xs">
          Car Service Book
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="highlight-rounded">
        {links[pathname === "/" ? "home" : "app"]?.map((link) => (
          <Navbar.Link key={link.id} href={link.href}>
            {link.label}
          </Navbar.Link>
        ))}
      </Navbar.Content>
      {pathname !== "/" && user && (
        <Navbar.Content>
          <User src={user.image} name={user.name} description={user?.email} />
        </Navbar.Content>
      )}
    </Navbar>
  );
}
