import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, getPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create-post", verifyToken, create);
router.get("/get-posts", verifyToken, getPosts);

export default router;
