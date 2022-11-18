import { type NextPage } from "next";
import React from "react";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <Seo title="Home" description="Description of Home" />
        <div className="hero bg-base-200 min-h-app">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Car service book</h1>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
