import { Router } from "express";
import {
  logout,
  signin,
  signUp,
  verifyRefreshToken,
} from "../controllers/authController";
import {
  getAllUsers,
  getBreedOwners,
  getUserByEmail,
  getUser,
  followUser,
  unfollowUser,
  blockUser,
  unblockUser,
  getUserById,
  isFollowing,
  isBlocked,
} from "../controllers/userController";

import { validateData } from "../middlewares/validationMiddleware";
import { SigninFormSchema, SignupFormSchema } from "../utils/shcemas";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/signin", validateData(SigninFormSchema), signin);
router.post("/signup", validateData(SignupFormSchema), signUp);
router.post("/logout", logout);
router.post("/follow/:followingId", verifyToken, followUser);
router.post("/unfollow/:followingId", verifyToken, unfollowUser);
router.post("/block/:blockedId", verifyToken, blockUser);
router.post("/unblock/:blockedId", verifyToken, unblockUser);

router.get("/", getAllUsers);
router.get("/refresh-token/:refreshToken", verifyRefreshToken);
router.get("/get-user", verifyToken, getUser);
router.get("/get-user-by-email", getUserByEmail);
router.get("/get-user-by-id/:id", getUserById);
router.get("/breed-owner/:breedId", getBreedOwners);
router.get("/follow-status/:followingId", verifyToken, isFollowing);
router.get("/block-status/:blockedId", verifyToken, isBlocked);

export default router;
