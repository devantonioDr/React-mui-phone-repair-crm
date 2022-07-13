// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import RepairLocal from '../../../data/Repair/RepairLocal';
import { RepairData } from '../../../types/Template';

type Data = {
  status: "ok" | "error";
  message?: string;
  data?: RepairData;
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method == "GET") {
    try {
      const { id } = req.query
      let singleRepair = RepairLocal.getSingleRepair(id);
      if (singleRepair) {
        res.status(200).json({ status: "ok", data: singleRepair });
        return;
      }
      let message = `Request id ${id} not found.`
      res.status(400).json({ status: "error", message })
    } catch (e: any) {
      res.status(400).json({ status: "ok", message: e });
    };
  }

}
