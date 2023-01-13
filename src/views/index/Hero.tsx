import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-32 even:bg-base-200 sm:py-40 md:py-56">
      <div className="container grid md:grid-cols-2 md:gap-8 xl:gap-0">
        <div className="mr-auto place-self-center">
          <h2 className="mb-4 max-w-2xl text-3xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl lg:text-6xl">
            Stay Up-to-Date with vehicle maintenance and repairs
          </h2>
          <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
            Effortlessly keep track of your vehicle&apos;s service history with
            our convenient app.
          </p>
          <Link className="btn-outline btn w-full sm:w-auto" href="/app">
            Go to app
          </Link>
        </div>
        <div className="hidden md:flex">
          <Image
            priority
            src="/assets/images/car_repair.svg"
            width={736}
            height={279}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
