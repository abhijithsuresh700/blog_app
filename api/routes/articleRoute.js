import express from 'express';
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ dest: 'uploads/' });


import { createArticle, getAllAricles, updateArticle, deleteArticle, articleByCategory, trendingArticles } from '../controllers/articleController.js';
const router = express.Router();
//upload.single('image')
router.post("/",upload.single('image'), createArticle)
router.get("/", getAllAricles)
router.put("/:id", updateArticle)
router.delete("/:id", deleteArticle)
router.get("/trending", trendingArticles)
router.get("/:category", articleByCategory)

export default router;