import { type NextPage } from "next";
import React from "react";

import Seo from "@/components/Seo";
import HomeLayout from "@/layouts/HomeLayout";
import { trpc } from "@/utils/trpc";

const Home: NextPage = () => {
  const { data: cars, error: carsError } = trpc.car.getAll.useQuery();
  console.log("cars: ", cars);
  console.log("carsError: ", carsError?.message);

  const { data: car, error } = trpc.car.getOne.useQuery({
    carId: "eb8c78e2-32eb-4163-b8c1-f7e8c87f121c",
  });
  console.log("car: ", car);
  console.log("error: ", error?.message);

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
};

export default Home;
