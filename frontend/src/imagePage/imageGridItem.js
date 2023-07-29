import React, { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa'; // Import the outlined heart icon from react-icons/fa
import './imageGridItem.css'
import { IoHeartSharp } from 'react-icons/io5';
import axios from 'axios';
const ImageGridItem = ({ image, aspectRatio, postId,liked }) => {
  const [nowLiked,setNowLiked]=useState(liked)
  const storedToken = localStorage.getItem('token');
  
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');
  let imageClass;
const removeLike=async(userId,postId)=>{

  liked=false;
  setNowLiked(false)
  try {
    const headers = {
      'Authorization': `Bearer ${storedToken}`,
    };

    const response = await axios.post(`http://localhost:3001/likes/updateById/${userId}/${postId}`, { headers });

    if (response.data) {
      liked=false;
      setNowLiked(false)
    }
  } catch (error) {
    console.log("unlike error", error);
  } finally {
  }
}
const addLike=async(userId,postId)=>{
  setNowLiked(true);
  liked=true
  try {
    const headers = {
      'Authorization': `Bearer ${storedToken}`,
    };

    const response = await axios.post(`http://localhost:3001/likes/create`,{userId,postId,userName}, { headers });

    if (response.data) {
      liked=true;
      setNowLiked(true)
    }
  } catch (error) {
    console.log("unlike error", error);
  } finally {
  }

}
  if (aspectRatio > 1) {
    imageClass = 'portrait';
  } else if (aspectRatio < 1) {
    imageClass = 'landscape';
  } else {
    imageClass = 'square';
  }

  return (
    <div className={`image-grid-item ${imageClass}`} style={{ paddingBottom: `${aspectRatio * 100}%` }}>
      <div className="image-container">
        <img src={image} alt={`Post ${postId}`} />
        <div className="heart-icon">
        { liked || nowLiked?
<IoHeartSharp size={24} color="red" onClick={()=>removeLike(userId,postId)}/>: 
        <FaRegHeart onClick={()=>addLike(userId,postId)} />}
        </div>
      </div>
    </div>
  );
};

export default ImageGridItem;
