import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import app from "./app.js";

const port = process.env.SERVER_PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
