import { Avatar, Dropdown, Link, Navbar, Text } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

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
      <Navbar.Toggle showIn="xs" />
      <Navbar.Brand
        css={{
          "@xs": {
            w: "12%",
          },
        }}
      >
        <Image
          style={{ marginRight: "1rem" }}
          src="/favicon.svg"
          width={50}
          height={50}
          alt=""
        />
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor="secondary"
        hideIn="xs"
        variant="highlight-rounded"
      >
        {links[pathname === "/" ? "home" : "app"]?.map((link) => (
          <Navbar.Link
            as={NextLink}
            isActive={pathname === link.href}
            key={link.id}
            href={link.href}
          >
            {link.label}
          </Navbar.Link>
        ))}
      </Navbar.Content>
      <Navbar.Content
        css={{
          "@xs": {
            w: "12%",
            jc: "flex-end",
          },
        }}
      >
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                color="secondary"
                size="md"
                src={user?.image}
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="secondary"
            onAction={(actionKey) => {
              switch (actionKey) {
                case "sign-out":
                  signOut();
                  break;
                default:
                  break;
              }
            }}
          >
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                {user?.email}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
              My Settings
            </Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
              Help & Feedback
            </Dropdown.Item>
            <Dropdown.Item key="sign-out" withDivider color="error">
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
      <Navbar.Collapse>
        {links[pathname === "/" ? "home" : "app"]?.map((link, index) => (
          <Navbar.CollapseItem
            key={link.id}
            activeColor="secondary"
            isActive={index === 2}
          >
            <Link
              as={NextLink}
              color="inherit"
              css={{
                minWidth: "100%",
                color: pathname === link.href ? "$primary" : "$text",
              }}
              href={link.href}
            >
              {link.label}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
