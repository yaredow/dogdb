import { Router } from "express";
import {
  deleteConversation,
  getConversationById,
  getConversations,
  getSeen,
} from "../controllers/conversationController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/seen/:conversationId", verifyToken, getSeen);

router.get("/get-conversations", verifyToken, getConversations);
router.get(
  "/get-conversation/:conversationId",
  verifyToken,
  getConversationById,
);

router.delete(
  "/delete-conversation/:conversationId",
  verifyToken,
  deleteConversation,
);

export default router;
