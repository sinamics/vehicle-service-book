import type { Repair } from "@prisma/client";
import cx from "classnames";
import dayjs from "dayjs";
import Link from "next/link";
import { FaCalendarCheck, FaPiggyBank, FaRoad } from "react-icons/fa";
import { FiAlertCircle, FiPlus } from "react-icons/fi";

import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";
import { formatDate, formatMileage, formatPrice } from "@/utils/formatters";
import { trpc } from "@/utils/trpc";

function TotalSpendStat(
  repairs: Omit<Repair, "id" | "createdAt" | "carId" | "updatedAt">[]
) {
  const totalSpend = repairs
    .map((repair) => repair.price)
    .reduce((a, b) => {
      if (typeof a !== "number") return 0;
      if (typeof b !== "number") return 0;
      return a + b;
    }, 0);

  return (
    <div className="stat">
      <div className="stat-figure text-accent">
        {totalSpend ? (
          <FaPiggyBank className="inline-block h-8 w-8 stroke-current" />
        ) : (
          <FiAlertCircle className="inline-block h-8 w-8 stroke-current" />
        )}
      </div>
      <div className="stat-title whitespace-normal text-sm md:text-base">
        {totalSpend ? "Total spend" : "No repairs"}
      </div>
      {totalSpend ? (
        <>
          <div className="stat-value whitespace-normal text-2xl text-accent md:text-4xl">
            {formatPrice(totalSpend)}
          </div>
          <div className="stat-desc whitespace-normal text-xs md:text-sm">
            of {repairs.length} repairs
          </div>
        </>
      ) : null}
    </div>
  );
}

function LastMileageStat(
  repairs: Omit<Repair, "id" | "createdAt" | "carId" | "updatedAt">[]
) {
  const allMileages = repairs.map((repair) => repair.mileage);
  const lastMileage = allMileages.reduce((a, b) => {
    if (typeof a !== "number") return 0;
    if (typeof b !== "number") return 0;
    return a > b ? a : b;
  }, 0);

  const firstMileage = allMileages.reduce((a, b) => {
    if (typeof a !== "number") return 0;
    if (typeof b !== "number") return 0;
    if (a === 0) return b;
    return b > a ? a : b;
  }, 0);

  return (
    <div className="stat">
      <div className="stat-figure text-accent">
        {lastMileage && firstMileage ? (
          <FaRoad className="inline-block h-8 w-8 stroke-current" />
        ) : (
          <FiAlertCircle className="inline-block h-8 w-8 stroke-current" />
        )}
      </div>
      <div className="stat-title whitespace-normal text-sm md:text-base">
        {typeof lastMileage === "number" && typeof firstMileage === "number"
          ? "Last mileage"
          : "No repairs"}
      </div>
      {typeof lastMileage === "number" && typeof firstMileage === "number" ? (
        <>
          <div className="stat-value whitespace-normal text-2xl text-accent md:text-4xl">
            {formatMileage(lastMileage)}
          </div>
          <div className="stat-desc whitespace-normal text-xs md:text-sm">
            {lastMileage - firstMileage !== 0
              ? `+${formatMileage(lastMileage - firstMileage)}`
              : null}
          </div>
        </>
      ) : null}
    </div>
  );
}

function LastDateStat(
  repairs: Omit<Repair, "id" | "createdAt" | "carId" | "updatedAt">[]
) {
  const lastDate = repairs
    .map((repair) => repair.date)
    .reduce((a, b) => {
      if (repairs.length === 1) return b;
      if (!a) return null;
      if (!b) return null;
      return dayjs(a).isAfter(dayjs(b)) ? a : b;
    }, null);

  const difference = dayjs().diff(lastDate, "day");

  return (
    <div className="stat">
      <div className="stat-figure text-accent">
        {lastDate ? (
          <FaCalendarCheck className="inline-block h-8 w-8 stroke-current" />
        ) : (
          <FiAlertCircle className="inline-block h-8 w-8 stroke-current" />
        )}
      </div>
      <div className="stat-title whitespace-normal text-sm md:text-base">
        {lastDate ? "Last repair date" : "No repairs"}
      </div>
      {lastDate ? (
        <>
          <div className="stat-value whitespace-normal text-2xl text-accent md:text-4xl">
            {formatDate(lastDate)}
          </div>
          <div className="stat-desc whitespace-normal text-xs md:text-sm">
            {difference === 0
              ? "Today"
              : difference === 1
              ? "Yesterday"
              : `${difference} days ago`}
          </div>
        </>
      ) : null}
    </div>
  );
}

function DashboardList() {
  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data: cars,
  } = trpc.car.getAllWithRepairs.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isSuccess && !cars?.length) {
    return (
      <div className="flex min-h-layout-inside-mobile flex-col items-center justify-center sm:min-h-layout-inside">
        <FiAlertCircle className="mx-auto mb-4" size={56} />
        <h2 className="text-center text-3xl">You don&apos;t have any cars</h2>
        <p className="text-center">Add your first car to show your dashboard</p>
        <Link href="/app/cars/add" className="btn mt-4">
          <FiPlus className="mr-2" size={20} />
          Add car
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-16">
      {cars?.map((car, index) => (
        <div className="flex flex-col" key={car.id}>
          <h1 className="mb-4 text-center text-2xl md:text-3xl">
            {car.brand} {car.model} {car.generation} {car.productionYear}
          </h1>
          <div
            className={cx("stats stats-vertical shadow lg:stats-horizontal", {
              "bg-neutral": index % 2 === 0,
              "bg-base-200": index % 2 !== 0,
            })}
          >
            {TotalSpendStat(car.repairs)}
            {LastMileageStat(car.repairs)}
            {LastDateStat(car.repairs)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DashboardListWrapper() {
  return (
    <Layout>
      <Seo title="Dashboard" description="car service book dashboard" />
      <DashboardList />
    </Layout>
  );
}
