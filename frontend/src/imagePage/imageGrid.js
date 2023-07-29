import React, { useEffect, useState, useRef } from 'react';
import ImageGridItem from './imageGridItem';
import './imageGrid.css';
import axios from 'axios';

const ImageGrid = () => {
  const storedToken = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [imagesData, setImagesData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [pagePerSize, setPagePerSize] = useState(10);

  const imagesContainerRef = useRef(null);
  const isFetchingRef = useRef(false);

  const fetchImages = async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      const headers = {
        'Authorization': `Bearer ${storedToken}`,
      };

      const response = await axios.get(`http://localhost:3001/post/getallImages/${currentPage}/${pagePerSize}/${userId}`, { headers });

      if (response.data) {
        setImagesData((prevData) => [...prevData, ...response.data]);
        setHasMore(response.data.length > 0);
      }
    } catch (error) {
      console.log("fetchImages error", error);
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
    fetchImages();
  }, [currentPage, isFetching]);

  return (
    <div className="image-grid" ref={imagesContainerRef}>
      {imagesData.map((item) => (
        <ImageGridItem key={item.postId} image={item.image} aspectRatio={item.aspectRatio} postId={item._id} liked={item.liked}/>
      ))}
      {isFetching && <div>Loading more...</div>}
    </div>
  );
};

export default ImageGrid;
