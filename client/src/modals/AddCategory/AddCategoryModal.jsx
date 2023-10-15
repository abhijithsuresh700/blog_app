import React, { useState } from 'react'
import "./addCategoryModal.css"
import { axiosInstance } from '../../utils/config';

const AddCategoryModal = () => {
    const [newCategory, setNewCategory] = useState("");
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(true);


    const handleSubmit = async () => {
        await axiosInstance.post(`/category`, { name: newCategory });
        setNewCategory("");
        window.location.reload()
      };

      const handleClose = ()=>{
        window.location.reload();
      }


  return (
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
      <button onClick={() => handleClose()}>Close</button>
    </div>
  </div>
  )
}

export default AddCategoryModal