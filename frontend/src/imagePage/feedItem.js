
import './feedPhoto.css';
import { useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { FaEllipsisH, FaRegHeart, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import defaultImg from '../images/images.png'
import { IoHeartSharp } from 'react-icons/io5';
import './feedItem.css'
const FeedItem = (props) => {
    const { post, liked } = props
    const [nowLiked, setNowLiked] = useState(liked);
    const [likeCount, setLikeCount] = useState(0);
    const [likedPeople, setLikedPeople] = useState([]);
    const storedToken = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const [feedData, setFeedData] = useState([]);
    const[tooltipVisible,setTooltipVisible]=useState(false)
    const handleTaggedPeople=()=>setTooltipVisible(!tooltipVisible)
    const [showFullCaption, setShowFullCaption] = useState(false);
    const toggleCaption = () => {
        setShowFullCaption((prev) => !prev);
    };

    const removeLike = async (userId, postId, userName, liked) => {
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

    const getAllLikes = async (userId, postId) => {

        try {
            const headers = {
                'Authorization': `Bearer ${storedToken}`,
            };
            const response = await axios.get(`http://localhost:3001/likes/getLikesByPostId/${postId}`, { headers });
            if (response.data) {
                setLikeCount(response.data.length)
                setLikedPeople(response.data)
            }
        } catch (error) {
            console.log("unlike error", error);
        } finally {
        }
    };
    const addLike = async (userId, postId, userName, liked) => {
        setNowLiked(true);
        liked = true;
        try {
            const headers = {
                'Authorization': `Bearer ${storedToken}`,
            };
            const data = {
                userId, postId, userName
            }
            const response = await axios.post(`http://localhost:3001/likes/create`, data, { headers });
            if (response.data !== "alreadyLiked") {
                console.log(response)
                liked = true;
                setNowLiked(true);
                // setLikeCount(likeCount )
                getAllLikes(userId,postId)
            }
        } catch (error) {
            console.log("unlike error", error);
        } finally {
        }
    };
    const RenderLikeDetails = () => {
        if (likeCount === 0) {
            return null;
        } else if (likeCount === 1) {
            const likedBy = likedPeople[0];
            return (
                <div className="like-details">
                    <div className="profile-photo">
                        {likedBy?.profilePhoto ? (
                            <img src={likedBy.profilePhoto} alt="" />
                        ) : (
                            <FaUserCircle />
                        )}
                        <span>{likedBy?.userName} emoted</span>
                    </div>
                </div>
            );
        } else if (likedPeople.length === 2) {
            const firstThreeLikers = likedPeople.slice(0, 2);
            const otherLikesCount = likeCount - 1;
            return (
                <div className="like-details">
                    {firstThreeLikers.map((liker, index) => (
                        <div className="profile-photo" key={index}>
                            {liker?.profilePhoto ? (
                                <img src={liker?.profilePhoto} alt="" />
                            ) : (
                                <FaUserCircle />
                            )}
                        </div>
                    ))}
                    {otherLikesCount > 0 && (
                        <div className="other-likes">
                            <span>{likedPeople[0]?.userName} and {otherLikesCount} others</span>
                        </div>
                    )}
                    <span>emoted</span>
                </div>
            );
        } else if (likedPeople.length > 1) {
            const firstThreeLikers = likedPeople.slice(0, 3);
            const otherLikesCount = likeCount - 1;
            return (
                <div className="like-details">
                    {firstThreeLikers.map((liker, index) => (
                        <div className="profile-photo" key={index}>
                            {liker?.profilePhoto ? (
                                <img src={liker?.profilePhoto} alt="" />
                            ) : (
                                <FaUserCircle />
                            )}
                        </div>
                    ))}
                    {otherLikesCount > 0 && (
                        <div className="other-likes">
                            <span>{likedPeople[0]?.userName} and {otherLikesCount} others</span>
                        </div>
                    )}
                    <span>liked</span>
                </div>
            );
        }
    };

    useEffect(() => { getAllLikes(post?.userid, post._id) }, [post])
    return (
        <div key={post._id} className="post-container">
            <div className="user-row">
                <div style={{ display: "flex" }}>
                    <FaUserCircle size={50} color="#aaa" className="userCircleIcon" />
                    <span className="username">{post?.userName}</span></div>
                <div>  <div className="three-dots">
                    <FaEllipsisH size={20} color="#000" />
                </div>
                </div>
            </div>  <div className="image-container" onClick={()=>handleTaggedPeople()}>
                <img src={post.image} alt={`Post ${post._id}`} className="post-image" /> 
                 {tooltipVisible &&post.tag.length > 0 &&(
    <div className="tooltip">
      {/* Display the tagged people here */}
      {post?.tag.map((person, index) => (
        <span key={index}>{person.userName}</span>
      ))}
    </div>
  )}
                <div className="heart-icon">
                    {post?.liked || nowLiked ? (
                        <IoHeartSharp size={24} color="red" onClick={() => removeLike(post?.userId, post?._id, post?.userName, post?.liked)} />
                    ) : (
                        <FaRegHeart onClick={() => addLike(post?.userId, post?._id, post?.userName, post?.liked)} />
                    )}
                </div>
            </div>
            <RenderLikeDetails />
            <div className="post-caption" style={{ maxHeight: showFullCaption ? 'none' : '60px', overflow: 'hidden' }}>
                {showFullCaption ? post?.description : post?.description.slice(0, 80)}
                {post?.description.length > 80 && !showFullCaption && (
                    <span onClick={toggleCaption} style={{ marginLeft: "6px" }} className="show-more">
                        show more
                    </span>
                )}
                {post?.description.length > 80 && showFullCaption && (
                    <span onClick={toggleCaption} className="show-more">
                        show less
                    </span>
                )}
            </div>
        </div>
    );
};

export default FeedItem;
