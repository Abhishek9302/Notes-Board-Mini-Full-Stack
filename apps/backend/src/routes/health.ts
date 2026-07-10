import { Router } from "express";
import pool from "../db";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT 1");
    if (result.rowCount === 1) {
      res.json({ status: "ok", db: "connected" });
      return;
    }
    res.status(503).json({ status: "error", db: "unhealthy" });
  } catch (err) {
    res.status(503).json({ status: "error", db: "down", error: String(err) });
  }
});

export default router;
