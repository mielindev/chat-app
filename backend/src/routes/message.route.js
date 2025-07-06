import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import messageController from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, messageController.getUsersForChat);
router.get("/messages/:id", protectRoute, messageController.getMessages);
router.post("/send-message/:id", protectRoute, messageController.sendMessage);
export default router;
