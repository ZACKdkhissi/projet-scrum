import express from "express";
import { addPost, deletePost,  getPosts,  updatePost } from "../controller/post.js";

const router = express.Router();

//router.get("/:id", getPost);
router.get("/", getPosts);

router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;

