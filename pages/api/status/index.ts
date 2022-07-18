// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import RepairLocal from "../../../data/Repair/local/RepairLocal";
import RepairStatusLocal from "../../../data/Repair/local/RepairStatusLocal";

type Data = {
  status: "ok" | "error";
  message?: string;
  data?: RepairStatus[];
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "GET") {
    try {
      const statuses = RepairStatusLocal.all();
      res.status(200).json({ status: "ok", data: statuses });
    } catch (e: any) {
      res.status(400).json({ status: "ok", message: e });
    }
  }
}
