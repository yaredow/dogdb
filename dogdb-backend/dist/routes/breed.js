"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const breedController_1 = require("../controllers/breedController");
const router = (0, express_1.Router)();
router.get("/", breedController_1.getAllBreeds);
router.get("/:id", breedController_1.getBreed);
exports.default = router;
