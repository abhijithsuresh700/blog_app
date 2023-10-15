import express from 'express';
import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: (req,file, cb)=> {
        cb(null, 'public/images')
    },
    filename: (req,file, cb)=>{
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});
// const upload = multer({ dest: 'uploads/' });

const upload = multer({
    storage: storage
})


import { createArticle, getAllAricles, updateArticle, deleteArticle, articleByCategory, trendingArticles, getSingleArticle } from '../controllers/articleController.js';
const router = express.Router();
router.post("/",upload.single('image'), createArticle)
router.get("/trending", trendingArticles)
router.get("/:id", getSingleArticle)
router.put("/:id", updateArticle)
router.delete("/:id", deleteArticle)
router.get("/category/:category", articleByCategory)
router.get("/", getAllAricles)

export default router;