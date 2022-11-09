import { GetServerSidePropsContext } from "next";

export async function carsService(context: GetServerSidePropsContext) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cars`, {
      headers: {
        cookie: context.req.headers.cookie || "",
      },
    });

    return await res.json();
  } catch (error) {
    console.error(error);
  }
}
