import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./Routes/productRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./libs/arcjet.js";

dotenv.config({ path: "./config/.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://ezstore-rust.vercel.app",
  })
);
app.use(morgan("dev"));
app.use(helmet());

// Arcjet Middleware
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 5 });
    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ error: "No bots allowed" });
      } else {
        return res.status(403).json({ error: "Forbidden" });
      }
    }

    next();
  } catch (error) {
    console.log("Arcjet Error", error);
    next(); // Proceed even if Arcjet fails
  }
});

// Routes
app.use("/api/products", productRoutes);

// Connect DB and Start Server
async function connectDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )`;
    console.log("✅ Database Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("❌ Database connection failed:", error);
  }
}

connectDB();
