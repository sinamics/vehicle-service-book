import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <Seo
        description="Our car service book web application is a convenient and easy-to-use tool for keeping track of your car's service history. With our app, you can easily store all of your car's repair information in one place, making it easy to stay on top of your car's upkeep. You can add details about each service visit, including the date, mileage, work performed, and costs. Our app is perfect for both individual car owners and small businesses with a fleet of cars. With our app, you'll never have to worry about losing track of important service information or not having a complete service history for your car."
        withOg
      />
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
        <h1>Car service book</h1>
      </div>
    </Layout>
  );
}
