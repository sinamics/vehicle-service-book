import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5BBAD5" />
        <meta name="msapplication-TileColor" content="#DA532C" />
        <meta name="theme-color" content="#FFFFFF" />
      </Head>
      <body className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
