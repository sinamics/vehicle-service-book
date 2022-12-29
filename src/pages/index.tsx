import Link from "next/link";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <Seo
        description="Our vehicle service book web application is a convenient and easy-to-use tool for keeping track of your vehicle's service history. With our app, you can easily store all of your vehicle's repair information in one place, making it easy to stay on top of your vehicle's upkeep. You can add details about each service visit, including the date, mileage, work performed, and costs. Our app is perfect for both individual vehicle owners and small businesses with a fleet of vehicles. With our app, you'll never have to worry about losing track of important service information or not having a complete service history for your vehicle."
        withOg
      />
      <div className="grid min-h-layout-inside-mobile grid-cols-2 bg-base-200 sm:min-h-layout-inside">
        <div className="container flex flex-col gap-4">
          <h1>Vehicle service book</h1>
          <Link className="btn-primary btn" href="/app">
            Go to app
          </Link>
        </div>
      </div>
    </Layout>
  );
}
