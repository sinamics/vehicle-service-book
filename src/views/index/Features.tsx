import cx from "classnames";
import { GiAutoRepair } from "react-icons/gi";
import { ImStatsDots } from "react-icons/im";
import { IoCarSportSharp } from "react-icons/io5";

const features = [
  {
    id: 1,
    title: "Cars Management",
    description:
      "This feature allows users to add, update and delete vehicle from the web application. This can include information such as make, model, production year, VIN, and many more.",
    icon: <IoCarSportSharp className="h-8 w-8" />,
  },
  {
    id: 2,
    title: "Service and Repair Logging",
    description:
      "Allows users to log and keep track of all the service and repair history for each vehicle in the application. This can include information such as date, cost, mileage and details of the service performed.",
    icon: <GiAutoRepair className="h-8 w-8" />,
  },
  {
    id: 3,
    title: "Statistics",
    description:
      "Allows users to generate various statistics and reports on the service history of all vehicles. This can include things like the total cost of repairs, total number of repairs, last mileage of repair, mileage between first and last repair and last repair date for each vehicle.",
    icon: <ImStatsDots className="h-8 w-8" />,
  },
];

export default function Features() {
  return (
    <section className="py-20 even:bg-base-200">
      <div className="container mx-auto flex flex-col gap-12 px-6 py-10 md:gap-20">
        <h2 className="text-center text-3xl font-black capitalize leading-10 text-accent md:text-5xl lg:text-6xl">
          Explore our awesome{" "}
          <span className="underline decoration-secondary">features</span>
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-12">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={cx("space-y-3 rounded-xl border-2 border-accent p-8", {
                "md:col-span-2 xl:col-span-1": index === features.length - 1,
              })}
            >
              <span className="inline-block text-accent">{feature.icon}</span>
              <h1 className="text-2xl font-semibold capitalize text-gray-700 dark:text-white">
                {feature.title}
              </h1>
              <p className="text-gray-500 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
