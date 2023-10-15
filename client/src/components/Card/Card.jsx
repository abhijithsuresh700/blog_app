import React, { useState, useEffect } from "react";
import "./card.css";
import { axiosInstance } from "../../utils/config";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CardEditModal from "../../modals/CardEdit/CardEditModal";

const Card = (articles) => {
  const [isArticleEditModalOpen, setIsArticleEditModalOpen] = useState(false);


  const imageUrl = `https://blog-app-niyl.onrender.com/images/${articles.item.image}`;



  const handleDelete = async (e) => {
    e.preventDefault();
    await axiosInstance.delete(`/article/${articles.item._id}`);
    window.location.reload();
  };

  return (
    <div className="cardContainer">
      <div className="cardImageContainerr">
        <img src={imageUrl} alt="Article Image" width={200} height={200} />
      </div>
      <div className="cardTextContainer">
        <div className="cardDetail">
          <span className="cardDate">2023-10-04</span>
          <span className="cardCategoryy">{articles.item.categories[0]}</span>
        </div>
        <h1>{articles.item.heading}</h1>
        <h6>{articles.item.description}</h6>
        <h5>read more</h5>
      </div>
      <div className="cardButtons">
        <button
          className="editButton"
          onClick={() => setIsArticleEditModalOpen(true)}
        >
          <EditIcon />
        </button>
        <button className="deleteButton" onClick={handleDelete}>
          <DeleteIcon />
        </button>
      </div>

      {isArticleEditModalOpen && (
        <CardEditModal id={articles.item._id} isArticleEditModalOpen={true} />
      )}
    </div>
  );
};

export default Card;
