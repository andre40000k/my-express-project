import { fileURLToPath } from "url";
import path from "path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
console.log(__dirname);

const parentDir = path.join(__dirname, "..");


export const getRootHandler = (req, res) => {
  res.sendFile(path.join(parentDir, "public", "login.html"));
};
