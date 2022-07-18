// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { RepairController } from '../../../../controllers/repairController';


export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method == "GET") {
    RepairController.getSingleRepair(req, res);
    return;
  }
  res.status(404).json({ status: "error", message: "method not allowed" });
}

