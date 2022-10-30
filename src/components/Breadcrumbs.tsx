import cx from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Breadcrumbs = () => {
  const { asPath } = useRouter();

  const breadcrumbs = React.useMemo(() => {
    const [pathWithoutQuery] = asPath.split("?");
    const asPathNestedRoutes = pathWithoutQuery.split("/").filter(Boolean).slice(1);

    const breadcrumbList = asPathNestedRoutes.map((path, index) => {
      const href = "/" + asPathNestedRoutes.slice(0, index + 1).join("/");
      return { href, text: path };
    });

    return [{ href: "/app", text: "Dashboard" }, ...breadcrumbList];
  }, [asPath]);

  return (
    <div className={"text-sm breadcrumbs"}>
      <ul>
        {breadcrumbs.map((crumb, index) => (
          <li key={index}>
            <Link
              className={cx("capitalize", {
                "text-gray-500": index !== breadcrumbs.length - 1,
                "pointer-events-none": index === breadcrumbs.length - 1,
              })} href={crumb.href}>
              {crumb.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
