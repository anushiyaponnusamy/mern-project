// Page.js
import React, { useState, useEffect } from 'react';
import './createPage.css';
import { useNavigate } from 'react-router-dom';


const Page = () => {
const navigate=useNavigate();
const handlePostNavigation=()=>navigate('/createPost')

  return (
    <div className="page-container">
      <div className="modal">
        <div className="close-icon-container">
          <div className="close-icon">&#10005;</div>
        </div>
        <div className="plus-container" onClick={handlePostNavigation}>
          <div className="plus-icon-box">
            {/* Plus icon inside a square box */}
            <div className="plus-icon">&#43;</div>
          </div> 
          <p>Create Post</p>
        </div>
        <div className="plus-container">
          <div className="plus-icon-box">
            {/* Plus icon inside a square box */}
            <div className="plus-icon">&#43;</div>
          </div>
          <p>Create Story</p>
        </div>
      </div>
      {/* ... */}
    </div>
  );
};

export default Page;
