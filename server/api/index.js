import express from "express";
import { db } from "../config/db.js";
import router from "../router/routes.js";
import { configDotenv } from "dotenv";
import cors from "cors"
import path from "path"

configDotenv({ path: "./.env" })


const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.resolve()

  app.use(
  cors({
    origin: "https://virtual-zoo-7iq9.vercel.app",
    credentials: true,
  })
);
  

//headers

app.use(express.json())

app.use("https://virtualzoo-backend.vercel.app/api/virtualzoo/", router);

 

app.listen(PORT, () => {
  db();
  console.log(`server is conenected to db and is listening on ${PORT}`);
});
