import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './suggestionBox.css';

const SuggestionBox = ({ isLoading, handleSelectUser, isMobileView ,closeSuggestion,userarray,handleUnselectUser}) => {
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [pagePerSize, setPagePerSize] = useState(10);
  const suggestionBoxRef = useRef(null);

  const fetchMoreSuggestions = async () => {
    if (loadingMore || isFetching ) return;
    try {
      const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      };
      const response = await axios.get(`http://localhost:3001/user/getAllUsers/${pageNum}/${pagePerSize}`, { headers });
      if (response.data) {
        console.log(response.data)
        setUserSuggestions( [...userSuggestions, ...response.data]);
        setHasMore(response.data.length === pagePerSize);
        setLoadingMore(false);
        setPageNum(prevPageNum => prevPageNum + 1);
      }
      else{
        closeSuggestion()
      }
    } catch (error) {
      console.log("fetchMoreSuggestions error", error);
      setLoadingMore(false);
    }finally{
        setIsFetching(false)
    }
  };
  const handleSelectandUnselect = (user) => {
    console.log("user",user)
    userarray.some((selectedUser) => selectedUser._id === user._id) ? handleUnselectUser(user._id) : handleSelectUser(user);
  };
  const handleScroll = () => {
    if (!loadingMore && hasMore) {
      const { scrollHeight, scrollTop, clientHeight } = suggestionBoxRef.current;
      if (scrollHeight - scrollTop - clientHeight <= 10) {
        fetchMoreSuggestions();
      }
    }
  };

  const addScrollListener = () => {
    if (suggestionBoxRef.current) {
      suggestionBoxRef.current.addEventListener('scroll', handleScroll);
    }
  };

  const removeScrollListener = () => {
    if (suggestionBoxRef.current) {
      suggestionBoxRef.current.removeEventListener('scroll', handleScroll);
    }
  };

  useEffect(() => {
    
    // fetchMoreSuggestions();
    addScrollListener();
    return removeScrollListener;
  }, []); 


  useEffect(() => {
      fetchMoreSuggestions();
    
  }, []); // Call this when isLoading changes
if(userSuggestions&&userSuggestions.length>0)
 { return (
    <div className="suggestion-box" ref={suggestionBoxRef}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
        
        <div className="close-icon" onClick={()=>closeSuggestion()}><span>&times;</span></div>
          <div className="suggestion-list">
        {/* You can use an SVG icon or any custom icon for the close icon */}
        
      </div>
            {userSuggestions.map((user) => (
              <div key={user._id} className={userarray._id===user._id?"suggestion-item-selected":"suggestion-item"} 
              onClick={() =>{handleSelectandUnselect(user)}}>
                {/* <img src={user.userProfilePhoto} alt={user.userName} className="user-avatar" /> */}
                <div className="user-name">@{user.userName}</div>
              </div>
            ))}
          
          {loadingMore && <div>Loading more...</div>}
        </>
      )}
    </div>
  );
            }
            else{
                return null;
            }
};

export default SuggestionBox;
