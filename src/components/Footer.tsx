import { SiFacebook, SiGithub, SiInstagram, SiTwitter } from "react-icons/si";

type SocialLinkProps = {
  href: string;
  alt: string;
  children: React.ReactNode;
};

const socialLinks = [
  {
    href: "https://facebook.com/teziovsky/",
    alt: "Teziovsky's facebook page",
    children: <SiFacebook />,
  },
  {
    href: "https://instagram.com/teziovsky/",
    alt: "Teziovsky's instagram page",
    children: <SiInstagram />,
  },
  {
    href: "https://twitter.com/teziovsky/",
    alt: "Teziovsky's twitter page",
    children: <SiTwitter />,
  },
  {
    href: "https://github.com/teziovsky/",
    alt: "Teziovsky's github page",
    children: <SiGithub />,
  },
];

const SocialLink = ({ href, alt, children }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-4 text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
  >
    {children}
    <span className="sr-only">{alt}</span>
  </a>
);

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl bg-gray-100 p-4 dark:bg-gray-900 sm:p-6">
      <div className="flex flex-col items-center justify-center sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
          © 2022{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:teziovsky@gmail.com"
            className="hover:text-gray-900 hover:underline hover:dark:text-white"
          >
            Jakub Soboczyński
          </a>
        </span>
        <div className="mt-4 flex sm:mt-0">
          {socialLinks.map((link) => (
            <SocialLink key={link.href} {...link} />
          ))}
        </div>
      </div>
    </footer>
  );
}
