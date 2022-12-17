import Link from "next/link";
import React from "react";

import StopSign from "@/assets/images/svg/StopSign.svg";

const Custom404 = () => {
  return (
    <div className="flex min-h-layout flex-col items-center justify-center gap-8">
      <div className="relative">
        <StopSign className="h-44 w-44 md:h-64 md:w-64" />
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform font-mono text-6xl text-base-100 md:text-8xl">
          404
        </h1>
      </div>
      <div className="flex flex-col justify-center gap-2">
        <p className="text-center text-2xl uppercase md:text-4xl">
          Your car is fine, but this is the end of the road.
        </p>
        <p className="text-center text-xl uppercase md:text-3xl">
          You have to turn back.
        </p>
      </div>
      <Link href="/" className="btn-outline btn md:btn-lg">
        Turn back
      </Link>
    </div>
  );
};

export default Custom404;
