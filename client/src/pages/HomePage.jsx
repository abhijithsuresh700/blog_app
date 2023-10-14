import React, { useEffect, useState } from "react";
import "./homePage.css";
import { axiosInstance } from "../utils/config";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [trending, setTrending] = useState([]);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [articleData, setArticleData] = useState({
    heading: "",
    readTime: "",
    description: "",
    categories: [],
    image: null,
    verified: true,
    newest: false,
    trending: false,
  });

  const [formData, setFormData] = useState(new FormData());

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


    const initialFormData = new FormData();
    for (const key in articleData) {
      if (key === "categories") {
        for (const category of articleData.categories) {
          initialFormData.append("categories", category);
        }
      } else {
        initialFormData.append(key, articleData[key]);
      }
    }
    setFormData(initialFormData);





  }, [newCategory]);

  const handleSubmit = async () => {
    await axiosInstance.post(`/category`, { name: newCategory });
    setNewCategory("");
    setIsCategoryModalOpen(false);
  };

  const handleCategoryCheckbox = (e) => {
    const { value } = e.target;
    const updatedCategories = [...articleData.categories];

    if (updatedCategories.includes(value)) {
      updatedCategories.splice(updatedCategories.indexOf(value), 1);
    } else {
      updatedCategories.push(value);
    }

    setArticleData({ ...articleData, categories: updatedCategories });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, [name]: value === "true" });
  };

  const handleArticleSubmit = async () => {
    try {
      const response = await axiosInstance.post(`/article`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsArticleModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

console.log(trending,"trendinf check")
  useEffect(() => {
    const updatedFormData = new FormData();
    for (const key in articleData) {
      if (key === "categories") {
        for (const category of articleData.categories) {
          updatedFormData.append("categories", category);
        }
      } else {
        updatedFormData.append(key, articleData[key]);
      }
    }
    setFormData(updatedFormData);
  }, [articleData]);


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
          <div className="categoryListItem" key={index}>
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
          <div className="allArticlesListItem" key={index}>
            <Card item={item} key={item._id} />
            <br />
          </div>
        ))}
      </div>

      {isCategoryModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Category</h2>
            <label htmlFor="categoryName">Category Name</label>
            <input
              type="text"
              id="categoryName"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => setIsCategoryModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {isArticleModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Article</h2>
            <div className="modal-content-firstdiv">
              <label htmlFor="heading">Heading</label>
              <input
                type="text"
                id="heading"
                value={articleData.heading}
                onChange={(e) =>
                  setArticleData({ ...articleData, heading: e.target.value })
                }
              />
              <label htmlFor="heading">Read Time</label>
              <input
                type="number"
                id="readTime"
                value={articleData.readTime}
                onChange={(e) =>
                  setArticleData({ ...articleData, readTime: e.target.value })
                }
              />
              <label htmlFor="heading">Description</label>
              <input
                type="text"
                id="description"
                value={articleData.description}
                onChange={(e) =>
                  setArticleData({
                    ...articleData,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="categoryInArticleModel">
              <label>Categories</label>
              <div>
              {categories?.map((item,index)=>(
                <>
                <input 
                type="checkbox"
                id={`${item.name}`}
                value={`${item.name}`}
                onChange={handleCategoryCheckbox}
                />
                <label key={index}>{item.name}</label>
                </>
              ))}
              </div>
            </div>

            <div>
              <label>Verified</label>
              <input
                type="radio"
                id="verifiedTrue"
                name="verified"
                value="true"
                checked={articleData.verified === true}
                onChange={handleRadioChange}
              />
              <label htmlFor="verifiedTrue">True</label>

              <input
                type="radio"
                id="verifiedFalse"
                name="verified"
                value="false"
                checked={articleData.verified === false}
                onChange={handleRadioChange}
              />
              <label htmlFor="verifiedFalse">False</label>
            </div>

            <div>
              <label>Newest</label>
              <input
                type="radio"
                id="newestTrue"
                name="newest"
                value="true"
                checked={articleData.newest === true}
                onChange={handleRadioChange}
              />
              <label htmlFor="newestTrue">True</label>

              <input
                type="radio"
                id="newestFalse"
                name="newest"
                value="false"
                checked={articleData.newest === false}
                onChange={handleRadioChange}
              />
              <label htmlFor="newestFalse">False</label>
            </div>

            <div>
              <label>Trending</label>
              <input
                type="radio"
                id="trendingTrue"
                name="trending"
                value="true"
                checked={articleData.trending === true}
                onChange={handleRadioChange}
              />
              <label htmlFor="trendingTrue">True</label>

              <input
                type="radio"
                id="trendingFalse"
                name="trending"
                value="false"
                checked={articleData.trending === false}
                onChange={handleRadioChange}
              />
              <label htmlFor="trendingFalse">False</label>
            </div>

            <div>
              <label>Image</label>
              <input
                type="file"
                onChange={(e) =>
                  setArticleData({ ...articleData, image: e.target.files[0] })
                }
              />
            </div>

            <button onClick={handleArticleSubmit}>Submit</button>
            <button onClick={() => setIsArticleModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
