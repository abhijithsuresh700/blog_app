import Category from "../models/categoryModel.js";

export const createCategory = async(req,res)=>{
    const category = new Category({
        name: req.body.name
      });
    try {
        await category.save();
    res.status(201).send(category);
    } catch (error) {
        console.log(error)
    }
}

export const getAllCategories = async(req,res)=>{
    try {
        const categories = await Category.find();
        res.send(categories);
        
    } catch (error) {
        console.log(error)
    }
}
