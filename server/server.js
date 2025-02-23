import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import logger from "./utils/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import "./utils/logCleaner.js";
import connectDB from "./config/db.js";
import path from "path";


connectDB();
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();


const corsOptions = {
  origin: process.env.FRONTEND_BASE_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(helmet()); //for req safety
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cookieParser());

/* CONNECT TO MONGODB */
console.log("mongoUrl...", process.env.MONGO_URL);
if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URL environment variable is not defined");
}


// Middleware for CSP (Fix S3 Image Loading)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data: https://mentor-hub.s3.ap-south-1.amazonaws.com;"
  );
  next();
});


// app.get("/", (req, res) => {
  
//   res.status(200).json({ message: "hello from home", text: "hlo world" });
// });

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname, "/client", "dist", "index.html"));
})


app.listen(PORT, () =>
  console.log(`server running on ${process.env.BACKEND_BASE_URL}`)
);

app.use(errorHandler);


// npm run dev - (from frontend dir)
// npm run server - from root dir

// after deploy to run this whole app - npm start from root ( to build front in back -> npm run build, from root)
