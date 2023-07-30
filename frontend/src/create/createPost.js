import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import { useHistory, useLocation } from 'react-router-dom';
import './createPost.css';

import { FiImage, FiCamera } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
const CreatePost = () => {
  const fileInputRef = useRef(null);
  const storedToken = localStorage.getItem('token');
  const [image,setImage]=useState("")
  const [selectedFile,setSelectedFile]=useState("")
  const location=useLocation();
  // const [type,setType]=useState(location.state?.type)
  const navigate = useNavigate()
  const handleGalleryClick = () => {
    fileInputRef.current.click();
  };
const handleGoBack=()=>navigate('/create')
  const handleFileUpload = async (event) => {
    const val=event.target.files[0];
    setSelectedFile(event.target.files[0]);
    
    if(val)
    setImage(URL.createObjectURL(val));
  };

  useEffect(() => {
    if(image)
    navigate('/imageEditor', { state: { selectedImageURL: image,selectedFile } });
  }, [image]);
  return (
    <div className="page-container1">
      {/* Left-facing arrow at top-left corner */}
      <div className="arrow-container" onClick={handleGoBack}>
        <div className="left-arrow">&#8592;</div>
      </div>

      {/* Two rows */}
      <div className="row" onClick={()=>{handleGalleryClick()}}>
        <div className="icon-container">
        <FiImage size={24} />
        </div>
        <div className="text">Choose from Gallery</div>
      </div>
      <hr></hr>
      <div className="row">
        <div className="icon-container">
        <FiCamera size={24} />
        </div>
        <div className="text">Capture with Camera</div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(e)=>handleFileUpload(e)}
      />
    </div>
  );
};

export default CreatePost;
