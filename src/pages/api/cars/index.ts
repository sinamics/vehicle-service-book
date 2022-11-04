import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return res.status(200).json({
        cars: [
          {
            id: 1,
            make: "Ford",
            model: "Fiesta",
            year: 2010,
            color: "Red",
          },
        ],
      });
    case "POST":
      return res.status(200).json({ message: "Cars created" });
    default:
      return res.status(405).end();
  }
}
