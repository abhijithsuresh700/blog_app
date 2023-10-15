import Article from "../models/articleModel.js";

export const createArticle = async(req,res)=>{
    const article = new Article({
        heading: req.body.heading,
        readTime: req.body.readTime,
        description: req.body.description,
        categories: req.body.categories,
        image: req.file.filename,
        verified: req.body.verified,
        newest: req.body.newest,
        trending: req.body.trending
      });
    try {
        await article.save();
        res.status(201).send(article);
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }

}

export const getAllAricles = async(req,res)=>{
    try {
        const articles = await Article.find();
        res.send(articles);
        
    } catch (error) {
        console.log(error)
    }
}

export const getSingleArticle = async(req,res)=>{
    try {
        const article = await Article.findById(req.params.id);
        res.send(article);
        
    } catch (error) {
        console.log(error)
    }
}

export const updateArticle = async(req, res) => {
    try {
        const updateArticle = await Article.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true});
        res.status(200).json(updateArticle)
    } catch (error) {
        console.log(error)
    }
};

export const deleteArticle = async(req,res)=>{
    const articleId = req.params.id;
    try {
        await Article.findByIdAndDelete(articleId);
        res.status(200).json("The Article has been deleted")
    } catch (error) {
        console.log(error)
    }
}

export const articleByCategory = async(req,res)=>{
    try {
        const articles = await Article.find({ categories: req.params.category });
        res.status(200).json(articles)
    } catch (error) {
        console.log(error)
    }
}

export const trendingArticles = async(req,res)=>{
    try {
        const articles = await Article.find({trending: true})
        res.status(200).json(articles)
    } catch (error) {
        console.log(error)
    }
}