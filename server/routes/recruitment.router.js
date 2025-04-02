import express from "express";
const recruitmentRouter=express.Router();
import recruitController from "../controllers/recruitment.controller.js"
recruitmentRouter.post("/recruit", recruitController);

export default recruitmentRouter
