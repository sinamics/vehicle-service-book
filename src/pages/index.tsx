import type { InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";

const Home = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  console.log("session: ", session);

  return (
    <Layout>
      <Seo title={"Home"} description={"Description of Home"} />
      <div className={"min-h-screen hero bg-base-200"}>
        <div className={"text-center hero-content"}>
          <div className={"max-w-md"}>
            <h1 className={"text-5xl font-bold"}>Hello there</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      email: "teziovsky@gmail.com",
    },
  };
}

export default Home;
