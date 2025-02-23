import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "combined.log"),
    }),
    new winston.transports.Console(),
  ],
});

export default logger;
