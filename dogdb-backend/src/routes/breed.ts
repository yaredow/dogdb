import { Router } from "express";
import { getAllBreeds, getBreed } from "../controllers/breedController";

const router = Router();

router.get("/", getAllBreeds);
router.get("/:slug", getBreed);
export default router;
