import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRouter from "./routes/health";
import notesRouter from "./routes/notes";
import authRouter from "./routes/auth";
import { initSchema } from "./initSchema";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.use("/health", healthRouter);
app.use("/api/notes", notesRouter);
app.use("/auth", authRouter);

async function start() {
  try {
    await initSchema();
  } catch (err) {
    console.error("[boot] schema init failed:", err);
    process.exit(1);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend listening on http://0.0.0.0:${PORT}`);
  });
}

start();
