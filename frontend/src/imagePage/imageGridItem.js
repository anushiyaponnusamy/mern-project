import React, { useEffect } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import './imageGridItem.css';
import { IoHeartSharp } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ImageGridItem = ({ image, aspectRatio, postId, liked }) => {
  const [nowLiked, setNowLiked] = React.useState(liked);
  const [aspectHeight, setAspectHeight] = React.useState(100);
  const storedToken = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');
  const navigate=useNavigate();
  let imageClass;
  const removeLike = async (userId, postId) => {
    liked = false;
    setNowLiked(false);
    try {
      const headers = {
        'Authorization': `Bearer ${storedToken}`,
      };
      const response = await axios.post(`http://localhost:3001/likes/updateById/${userId}/${postId}`, { headers });
      if (response.data) {
        liked = false;
        setNowLiked(false);
      }
    } catch (error) {
      console.log("unlike error", error);
    } finally {
    }
  };

  const addLike = async (userId, postId) => {
    setNowLiked(true);
    liked = true;
    try {
      const headers = {
        'Authorization': `Bearer ${storedToken}`,
      };
      const data={
        userId, postId, userName 
      }
      const response = await axios.post(`http://localhost:3001/likes/create`, data, { headers });
      if (response.data!=='alreadyLiked') {
        console.log(response)
        liked = true;
        setNowLiked(true);
      }
    } catch (error) {
      console.log("unlike error", error);
    } finally {
    }
  };

  if (aspectRatio === "16:9") {
    imageClass = 'portrait';
  } else if (aspectRatio === "4:3") {
    imageClass = 'landscape';
  } else {
    imageClass = 'square';
  }
  const handlePostPage=async(postId)=>{
    console.log("handlePostPage",postId)
    navigate('/feedPhoto', { state: { postId } })

  }
  useEffect(() => {
    if(aspectRatio){
    const [aspectWidth, aspectHeight] = aspectRatio.split(':').map(Number);
    const containerWidth = 300; // Set the container width to the desired value
    const calculatedHeight = (containerWidth / aspectWidth) * aspectHeight;
    setAspectHeight(calculatedHeight);
  }
  }, [aspectRatio]);
  return (
    <div className={`image-grid-item ${imageClass}`} style={{ height: `${aspectHeight}` }} >
      <div className="image-container1">
        <img src={image} alt={`Post ${postId}`} className="image" onClick={()=>handlePostPage(postId)} />
        <div className="heart-icon1">
          {liked || nowLiked ?
            <IoHeartSharp size={24} color="red" onClick={() => removeLike(userId, postId)} /> :
            <FaRegHeart onClick={() => addLike(userId, postId)} />}
        </div>
      </div>
    </div>
  );
};

export default ImageGridItem;
