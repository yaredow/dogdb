import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { getMessages } from "../controllers/messageController";

const router = Router();

router.get("/get-messages", verifyToken, getMessages);

export default router;
