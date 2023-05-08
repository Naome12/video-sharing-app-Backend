import express from "express";
import { addComment, getComments,deleteComment } from "../controllers/comment.controllers.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router()

router.post("/",verifyToken,addComment)
router.delete("/:id",verifyToken,deleteComment)
router.get("/:videoId",verifyToken,getComments)
export default router