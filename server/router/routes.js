import express from "express";
const router = express.Router();
import { dataMaker } from "../controller/data.js";
import { dataRetriver } from "../controller/retriever.js";



//routes

router.post("/data",dataMaker );
router.post("/:id",dataRetriver );

export default router;