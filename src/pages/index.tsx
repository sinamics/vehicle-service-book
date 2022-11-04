import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";

import { getUser } from "@/common/getUser";
import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";

const Index = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout user={props.user}>
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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const user = await getUser(context);
  return {
    props: {
      user,
    },
  };
};

export default Index;
