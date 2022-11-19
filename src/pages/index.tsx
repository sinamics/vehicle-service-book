import React from "react";

import Seo from "@/components/Seo";
import HomeLayout from "@/layouts/HomeLayout";

export default function Home() {
  return (
    <HomeLayout>
      <Seo title="HomeLayout" description="Description of HomeLayout" />
      <div className="hero bg-base-200 min-h-app">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Car service book</h1>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
