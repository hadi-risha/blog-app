import path from "path";
import { fileURLToPath } from "url";

// ✅ Define __dirname manually in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Now you can use __dirname safely
const logDirectory = path.join(__dirname, ""); // Adjust the path if needed

console.log("Log directory:", logDirectory);
