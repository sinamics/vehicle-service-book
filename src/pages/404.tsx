import Link from "next/link";
import React from "react";

const Custom404 = () => {
  return (
    <div className="flex min-h-layout flex-col items-center justify-center gap-8">
      <div className="relative">
        <svg
          className="h-44 w-44 md:h-64 md:w-64"
          xmlns="http://www.w3.org/2000/svg"
          width="512"
          height="512"
          viewBox="0 0 512 512"
          fill="none"
        >
          <g clip-path="url(#clip0_403_358)">
            <path
              d="M6 150L149.5 6H362L506 149.5V362L362 506H150L6 362V150Z"
              stroke="currentColor"
              stroke-width="11"
            />
            <path
              d="M29 159L159 29H353L483 159V353L353 483H159L29 349V159Z"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="11"
            />
          </g>
          <defs>
            <clipPath id="clip0_403_358">
              <rect width="512" height="512" fill="currentColor" />
            </clipPath>
          </defs>
        </svg>
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform font-mono text-6xl text-base-100 md:text-8xl">
          404
        </h1>
      </div>
      <p className="text-2xl uppercase md:text-4xl">The end of the road</p>
      <Link href="/" className="btn-outline btn md:btn-lg">
        Turn back if possible
      </Link>
    </div>
  );
};

export default Custom404;
