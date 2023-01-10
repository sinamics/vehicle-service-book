import Image from "next/image";

const features = [
  {
    id: 1,
    title: "Elegant Dark Mode",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta maiores ratione quos omnis. Commodi, provident fugiat, repudiandae dolor repellat sapiente molestias dolores placeat corrupti dolore delectus velit nobis saepe error!",
    icon: null,
  },
  {
    id: 2,
    title: "CEO of Company",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta maiores ratione quos omnis. Commodi, provident fugiat, repudiandae dolor repellat sapiente molestias dolores placeat corrupti dolore delectus velit nobis saepe error!",
    icon: null,
  },
  {
    id: 3,
    title: "CEO of Company",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta maiores ratione quos omnis. Commodi, provident fugiat, repudiandae dolor repellat sapiente molestias dolores placeat corrupti dolore delectus velit nobis saepe error!",
    icon: null,
  },
  {
    id: 4,
    title: "CEO of Company",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta maiores ratione quos omnis. Commodi, provident fugiat, repudiandae dolor repellat sapiente molestias dolores placeat corrupti dolore delectus velit nobis saepe error!",
    icon: null,
  },
  {
    id: 5,
    title: "CEO of Company",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta maiores ratione quos omnis. Commodi, provident fugiat, repudiandae dolor repellat sapiente molestias dolores placeat corrupti dolore delectus velit nobis saepe error!",
    icon: null,
  },
];

export default function Features() {
  return (
    <section className="py-20 even:bg-base-200">
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold capitalize text-gray-800 dark:text-white lg:text-4xl">
          explore our awesome{" "}
          <span className="underline decoration-secondary">Features</span>
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="space-y-3 rounded-xl border-2 border-accent p-8"
            >
              <span className="inline-block text-blue-500 dark:text-blue-400">
                {feature.icon}
              </span>
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
