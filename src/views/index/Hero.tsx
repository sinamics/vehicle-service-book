import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="even:bg-base-200">
      <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="mb-4 max-w-2xl text-3xl font-extrabold leading-none tracking-tight dark:text-white md:text-4xl xl:text-5xl">
            Stay Up-to-Date with vehicle maintenance and repairs
          </h1>
          <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
            Effortlessly keep track of your vehicle&apos;s service history with
            our convenient app.
          </p>
          <Link className="btn-outline btn" href="/app">
            Go to app
          </Link>
        </div>
        <div className="hidden md:col-span-5 md:mt-0 md:flex">
          <Image
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            width={943}
            height={706}
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
}
