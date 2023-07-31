// Page.js
import React, { useState, useEffect } from 'react';
import './createPage.css';
import { useNavigate } from 'react-router-dom';


const Page = () => {
const navigate=useNavigate();
const handlePostNavigation=(type)=>{navigate('/createPost',{state:{type}})}

  return (
    <div className="page-container">
      <div className="modal">
        <div className="close-icon-container" onClick={()=>navigate('/imageGrid')}>
          <div className="close-icon-create">&#10005;</div>
        </div>
        <div className="plus-container" onClick={()=>handlePostNavigation("image")}>
          <div className="plus-icon-box">
            <div className="plus-icon">&#43;</div>
          </div> 
          <p>Create Post</p>
        </div>
        <div className="plus-container" >
          <div className="plus-icon-box">
            <div className="plus-icon">&#43;</div>
          </div>
          <p>Create Story</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
