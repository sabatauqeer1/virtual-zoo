import express from "express";
import { db } from "./config/db.js";
import router from "./router/routes.js";
import { configDotenv } from "dotenv";
import cors from "cors"
configDotenv({ path: "./.env" })


const app = express();
const PORT = process.env.PORT || 3001;
app.use(
  cors({
    origin:"https://thevirtualzoo.netlify.app",
    credentials: true,
  })
);
//headers

app.use(express.json())
app.get("/", (req, res) => {
  res.send("Backend is live! ✅");
});
app.use("/api/virtualzoo/", router);
app.listen(PORT, () => {
  db();
  console.log(`server is conenected to db and is listening on ${PORT}`);
});
