import { Request, Router } from "express";
import axios from "axios";
import { errorChecked } from "../../utils.js";

const router = Router();

export interface RequestTeamWIthLimitOffset extends Request {
  limit: number;
  offset: number;
}

router.use("/:limit/:offset", async (req: RequestTeamWIthLimitOffset, res, next) => {
  const { limit, offset} = req.params;
  req.limit = Number(limit);
  req.offset = Number(offset);
  next();
});

router.get(
  "/:limit/:offset",
  errorChecked(async (req: RequestTeamWIthLimitOffset, res) => {
    const result = await axios.get(process.env.API_URL + `?limit=${req.limit}&offset=${req.offset}` , {
      headers: {
        "X-Auth-Token": process.env.API_TOKEN,
      },
    });
    res.status(200).json(result.data);
  })
);

export default router;
