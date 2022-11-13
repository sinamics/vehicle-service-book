import Head from "next/head";
import { useRouter } from "next/router";

type Props = {
  title: string;
  description: string;
  image?: string;
};

const Seo = ({ title, description, image = "/placeholder-social.jpg" }: Props) => {
  const url = process.env.NEXT_PUBLIC_URL;
  const canonicalURL = url + useRouter().pathname;

  return (
    <Head>
      <title>{`${title} | Car Service Book`}</title>
      <meta name="title" content={`${title} | Car Service Book`} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta name="og:title" property="og:title" content={`${title} | Car Service Book`} />
      <meta name="og:description" property="og:description" content={description} />
      <meta property="og:image" content={new URL(image, url).href} />
      <meta property="og:site_name" content="Jakub Soboczyński" />
      <meta name="og:locale" property="og:locale" content="pl_PL" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={`${title} | Car Service Book`} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:image" content={new URL(image, url).href} />
      <meta name="twitter:creator" content="@teziovsky" />

      <link rel="canonical" href={canonicalURL} />
    </Head>
  );
};

export default Seo;
