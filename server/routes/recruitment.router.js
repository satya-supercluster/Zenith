import express from "express";
const recruitmentRouter=express.Router();
import recruitController from "../controllers/recruitment.controller.js"
import recruitGetController from "../controllers/recruitGet.controller.js";

recruitmentRouter.post("/recruit", recruitController);
recruitmentRouter.get("/recruit/all", recruitGetController);

export default recruitmentRouter
