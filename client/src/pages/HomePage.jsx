import React, { useEffect, useState } from "react";
import "./homePage.css";
import { axiosInstance } from "../utils/config";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import AddCategoryModal from "../modals/AddCategory/AddCategoryModal";
import AddArticleModal from "../modals/AddArticle/AddArticleModal";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [trending, setTrending] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryArticles, setSelectedCategoryArticles] = useState([]);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);


  useEffect(() => {
    const articlesData = async () => {
      const result = await axiosInstance.get(`/article`);
      setArticles(result.data);
    };
    articlesData();

    const categoryData = async () => {
      const result = await axiosInstance.get(`/category`);
      setCategories(result.data);
    };
    categoryData();

    const trendingArticle = async () => {
      const result = await axiosInstance.get(`article/trending`);
      setTrending(result.data);
    };
    trendingArticle();


  }, []);

  const categoryArticles = async(item)=>{
    const result = await axiosInstance.get(`article/category/${item.name}`);
    setSelectedCategoryArticles(result.data);
  }


  return (
    <div className="container">
      <Navbar />
      <div className="welcomeNote">
        Welcome to Article.
        <span className="welcomeNoteTwo">
          {" "}
          Discover latest stories and creative ideas.
        </span>
      </div>
      <div className="categories">
        <div className="poplularCategoryTitle">Popular Categories</div>
        <button
          className="poplularCategoryButton"
          onClick={() => setIsCategoryModalOpen(true)}
        >
          Add Category
        </button>
      </div>
      <div className="categoryList">
        {categories.map((item, index) => (
          <div className="categoryListItem" key={index} onClick={()=>categoryArticles(item)}>
            {item.name}
          </div>
        ))}
      </div>

      <div className="trendingArticles">
        <div className="trendingArticleTitle">Trending articles</div>
        <button
          className="trendingArticleButton"
          onClick={() => setIsArticleModalOpen(true)}
        >
          Add Article
        </button>
      </div>
      <div className="trendingArticlesList">
        {trending.map((item, index) => (
          <div className="trendingArticlesListItem" key={index}>
            <Card item={item} key={item._id} />
            <br />
          </div>
        ))}
      </div>

      <div className="allArticles">
        <div className="allArticleTitle">All Articles</div>
      </div>
      <div className="allArticlesList">
        {articles.map((item, index) => (
          <div className="allArticlesListItem" key={index} >
            <Card item={item} key={item._id} />
            <br />
          </div>
        ))}
      </div>

      {isCategoryModalOpen && (
        <AddCategoryModal/>
      )}

      {isArticleModalOpen && (
        <AddArticleModal/>
      )}

{selectedCategoryArticles?.length !==0 && (
  <div>
    <div className="allArticles">
      <div className="allArticleTitle">Category Articles</div>
    </div>
    {selectedCategoryArticles?.map((item, index) => (
      <Card item={item} key={item._id}/>
    ))}
  </div>
)}
    </div>

  );
};

export default HomePage;
