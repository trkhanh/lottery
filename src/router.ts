import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getlotterys,
  getlottery,
  addlottery,
  updatelottery,
  deletelottery,
} from "./controller.ts";

const router = new Router();

router
  .get("/lotterys", getlotterys)
  .get("/lotterys/:id", getlottery)
  .post("/lotterys", addlottery)
  .put("/lotterys/:id", updatelottery)
  .delete("/lotterys/:id", deletelottery);

export default router;
