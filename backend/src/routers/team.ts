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
    console.log(result.data);
    res.status(200).json({ partners: result.data, ok: true });
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
