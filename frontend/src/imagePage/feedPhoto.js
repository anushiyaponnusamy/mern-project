
import './feedPhoto.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { FaEllipsisH, FaPlusSquare, FaRegHeart, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import defaultImg from '../images/images.png'
import { IoHeartSharp } from 'react-icons/io5';
import FeedItem from './feedItem';
const FeedPhoto = () => {
  const location=useLocation();
  const navigate=useNavigate();
  const [postId, setPostId] = useState(location.state?.postId);
  const [nowLiked, setNowLiked] = useState(false);
  const storedToken = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [feedData, setFeedData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [pagePerSize, setPagePerSize] = useState(10);

  const imagesContainerRef = useRef(null);
  const isFetchingRef = useRef(false);
  const handlePostDelete = (postId) => {
    // Filter out the deleted post from the feedData
    setFeedData((prevFeedData) => prevFeedData.filter((post) => post._id !== postId));
  };
  const getAllFeed = async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      const headers = {
        'Authorization': `Bearer ${storedToken}`,
      };

      const response = await axios.get(`http://localhost:3001/post/getSelectedImageAndOtherRecommendations/${userId}/${postId}/${currentPage}/${pagePerSize}`, { headers });
console.log("pId",postId)
      if (response.data) {
        setFeedData((prevData) => [...prevData, ...response.data]);
        setHasMore(response.data.length > 0);
      }
    } catch (error) {
      console.log("getAllFeed error", error);
    } finally {
      isFetchingRef.current = false;
      setIsFetching(false);
    }
  };

  const handleIntersection = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      setIsFetching(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const options = {
      root: null, // This is the viewport
      rootMargin: '0px',
      threshold: 0.1, // 0.1 means 10% of the target is visible
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (imagesContainerRef.current) {
      observer.observe(imagesContainerRef.current);
    }

    return () => {
      if (imagesContainerRef.current) {
        observer.unobserve(imagesContainerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    getAllFeed();
  }, [currentPage, isFetching]);

  return (
    <div className="image-grid-container">
    <div className="top-right-icons">
    <FaPlusSquare size={24} color="#000" className="iconfeed" onClick={()=>{navigate('/create')}} />
    <FaSearch size={24} color="#000" className="iconfeed" />
  </div>
    {feedData.map((post) => (
      
       <FeedItem post={post} liked={post?.liked} onDelete={()=>handlePostDelete(post._id)}/>
      
     ))}
    <div ref={imagesContainerRef} className="observer-element" />
  </div>
  );
};

export default FeedPhoto;
