import { Request, Router } from "express";
import axios from "axios";

import { errorChecked } from "../../utils.js";
const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await axios.get(process.env.API_URL, {
      headers: {
        "X-Auth-Token": process.env.API_TOKEN,
      },
    });
    res.status(200).json({ partners: result.data, ok: true });
  })
);

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

export interface RequestTeamvWithId extends Request {
  teamId: number;
}

router.use("/:id", async (req: RequestTeamvWithId, res, next) => {
  const { id } = req.params;
  req.teamId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestTeamvWithId, res) => {
    const result = await axios.get(process.env.API_URL + "/" + req.teamId , {
      headers: {
        "X-Auth-Token": process.env.API_TOKEN,
      },
    });
    res.status(200).json(result.data);
  })
);

export default router;
