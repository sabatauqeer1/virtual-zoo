import express from "express";
import { db } from "./config/db.js";
import router from "./router/routes.js";
import { configDotenv } from "dotenv";
import cors from "cors"
configDotenv({ path: "./.env" })


const app = express();
const PORT = 3001;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
//headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELTE, PATCH, OPTIONS"
  );
  next();
});
app.use(express.json())
app.get("/", (req, res) => {
  res.send("Backend is live! ✅");
});
app.use("/api/virtualzoo/", router);
app.listen(PORT, () => {
  db();
  console.log(`server is conenected to db and is listening on ${PORT}`);
});
