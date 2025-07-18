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
app.use(express.json());
app.use(cors());

app.use(morgan("dev"));
app.use(helmet());

app.use( async (req, res,next) => {
  try {
    const decision = await aj.protect(req, { requested: 5 }); // Deduct 5 tokens from the bucket
  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      res.writeHead(429, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Too Many Requests" }));
    } else if (decision.reason.isBot()) {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "No bots allowed" }));
    } else {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Forbidden" }));
    }
  } else if (decision.results.some(isSpoofedBot)) {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Forbidden" }));
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Hello World" }));
  }
  next()
  } catch (error) {
    console.log("Arcjet Error ",error)
    next()
  }
});

app.use("/api/products", productRoutes);

async function connectDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW())`;
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
}
connectDB().then(
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
);
