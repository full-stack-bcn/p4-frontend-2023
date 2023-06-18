import { Request, Router } from "express";
import axios from 'axios';

import { errorChecked } from "../../utils.js";
const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await axios.get(process.env.API_URL, {
        headers: {
          'X-Auth-Token': process.env.API_TOKEN,
        },
      });
    console.log("resultL ", result);
    res.status(200).json({ partners: result.data, ok: true });
  })
);

export default router;