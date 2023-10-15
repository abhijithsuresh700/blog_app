import React, { useEffect, useState } from 'react'
import "./addArticleModal.css"
import { axiosInstance } from '../../utils/config';

const AddArticleModal = () => {
    const [categories, setCategories] = useState([]);
    const [isArticleModalOpen, setIsArticleModalOpen] = useState(true);
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

      const categoryData = async () => {
        const result = await axiosInstance.get(`/category`);
        setCategories(result.data);
      };
      categoryData();

      const [formData, setFormData] = useState(new FormData());


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
          alert("Success")
          setIsArticleModalOpen(false);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      };


      const handleClose = ()=>{
        window.location.reload();
      }

  return (
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
          <div key={item._id}>
          <input 
          type="checkbox"
          id={`${item.name}`}
          value={`${item.name}`}
          onChange={handleCategoryCheckbox}
          />
          <label key={index}>{item.name}</label>
          </div>
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
      <button onClick={() => handleClose()}>Close</button>
    </div>
  </div>
  )
}

export default AddArticleModal