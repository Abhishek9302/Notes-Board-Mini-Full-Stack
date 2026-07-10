import fs from "fs";
import path from "path";
import pool from "./db";

/**
 * Apply database/schema.sql on boot so Railway Postgres gets tables
 * without a separate migration step. Safe to re-run (IF NOT EXISTS / ON CONFLICT).
 */
export async function initSchema(): Promise<void> {
  const candidates = [
    path.join(process.cwd(), "database", "schema.sql"),
    path.join(__dirname, "..", "database", "schema.sql"),
    path.join(__dirname, "database", "schema.sql"),
  ];
  const schemaPath = candidates.find((p) => fs.existsSync(p));
  if (!schemaPath) {
    console.warn("[initSchema] schema.sql not found; skipping");
    return;
  }
  const sql = fs.readFileSync(schemaPath, "utf8");
  await pool.query(sql);
  console.log(`[initSchema] applied ${schemaPath}`);
}
