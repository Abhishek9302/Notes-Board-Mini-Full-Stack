import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRouter from "./routes/health";
import notesRouter from "./routes/notes";
import authRouter from "./routes/auth";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.use("/health", healthRouter);
app.use("/api/notes", notesRouter);
app.use("/auth", authRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend listening on http://0.0.0.0:${PORT}`);
});
