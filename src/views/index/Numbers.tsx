const numbers = [
  {
    id: 1,
    label: "Cars",
    value: "500+",
  },
  {
    id: 2,
    label: "Repairs",
    value: "20k+",
  },
  {
    id: 3,
    label: "John Doe",
    value: "300",
  },
  {
    id: 4,
    label: "John Doe",
    value: "25+",
  },
];

export default function Numbers() {
  return (
    <section className="pb-40 even:bg-base-200">
      <div className="mx-auto bg-gradient-to-t from-base-100 to-base-200 pb-20">
        <div className="container mx-auto flex w-full flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="mt-20">
              <h2 className="text-center text-4xl font-black leading-10 text-white md:text-5xl lg:text-6xl">
                By the numbers
              </h2>
            </div>
            <div className="mx-2 mt-6 text-center md:mx-0">
              <p className="text-sm leading-6 text-white md:text-base  lg:text-lg">
                5 years, consistent quality and you get results. No matter what
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto -mt-8 flex items-center justify-center">
        <div className="grid gap-x-2 gap-y-2 sm:grid-cols-2 md:gap-x-6 md:gap-y-6 lg:grid-cols-4 lg:gap-x-6">
          {numbers.map((number, index) => (
            <div
              key={index}
              className="flex h-40 w-40 flex-col items-center justify-center rounded-2xl bg-white shadow sm:h-48 sm:w-48 md:h-52 md:w-52 lg:h-56 lg:w-56"
            >
              <h2 className="text-center text-2xl font-extrabold leading-10 text-gray-800 md:text-4xl lg:text-5xl">
                {number.value}
              </h2>
              <p className="mt-4 text-center text-sm leading-none text-gray-600 md:text-base lg:text-lg">
                {number.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
