import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
console.log(__dirname);

export const getRootHandler = (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
};
