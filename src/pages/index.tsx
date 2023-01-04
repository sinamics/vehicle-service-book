import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import Features from "@/views/index/Features";
import Hero from "@/views/index/Hero";
import Numbers from "@/views/index/Numbers";
import Testimonials from "@/views/index/Testimonials";

export default function Home() {
  return (
    <Layout>
      <Seo
        description="Our vehicle service book web application is a convenient and easy-to-use tool for keeping track of your vehicle's service history. With our app, you can easily store all of your vehicle's repair information in one place, making it easy to stay on top of your vehicle's upkeep. You can add details about each service visit, including the date, mileage, work performed, and costs. Our app is perfect for both individual vehicle owners and small businesses with a fleet of vehicles. With our app, you'll never have to worry about losing track of important service information or not having a complete service history for your vehicle."
        withOg
      />
      <Hero />
      <Features />
      <Numbers />
      <Testimonials />
    </Layout>
  );
}
