import express from "express";
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trends, updateVideo } from "../controllers/video.controllers.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router()
//create a video
router.post("/",verifyToken,addVideo)

//update a video
router.put("/:id",verifyToken,updateVideo);

//delete a video 
router.delete('/:id',verifyToken,deleteVideo)

//get a video 
router.get('/find/:id',getVideo)

//increment video views
router.put("/view/:id",addView)

//get trend videos
router.get("/trend",trends)

//get random videos
router.get("/random",random)

//get subscribed channel videos
router.get("/sub",verifyToken,sub)
router.get("/tags",getByTag)
router.get("/search",search)

export default router; 