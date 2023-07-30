import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiFillMinusCircle } from 'react-icons/ai';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SuggestionBox from './suggestionBox';
import { FaTag } from 'react-icons/fa';
import './finalCreate.css';

const ImageEditor = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const storedToken = localStorage.getItem('token');
    const uId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const [aspectRatio, setAspectRatio] = useState(location.state?.aspectRatio);
    const [showSuggestionBox, setShowSuggestionBox] = useState(false);
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(location.state?.selectedImageURL);
    const [pageNum, setPageNum] = useState(1);
    const [pagePerSize, setpagePerSize] = useState(10);
    const [users, setUsers] = useState([]);
    const [tag, setTag] = useState([]);
    const handleOpensuggestion = () => setShowSuggestionBox(true)
    const handleGoBack = () => {
        navigate('/imageEditior');
    };

    const handleSelectUser = (user) => {
        console.log("handleSelectUser", user)
        setTag([...tag, user])
    };
    const closeSuggestion = () => {
        setUsers([])
        setShowSuggestionBox(false);
    }
    const handleRemoveTag = (userId) => {
        setTag((prevTags) => prevTags.filter((tag) => tag._id !== userId));
    };

    const handleNextButtonClick = async () => {

        try {const data={
      tag,aspectRatio,description,image:selectedImage,userId:uId,userName,type:location.state?.type
        }
        console.log("data",data)
            const headers = {
                'Authorization': `Bearer ${storedToken}`, // Example authorization header
            };
            const response = await axios.post('http://localhost:3001/post/create', data, { headers });
            if (response.data) {
                console.log("resp",response.data)
                navigate('/imageGrid')
            }
        } catch (error) {
            console.log("handleNextButtonClick error", error)
        }
    };
    return (
        <div className="final-create">
            <div className="top-section1">
                <div className="arrow-container2" onClick={handleGoBack}>
                    <div className="left-arrow2">&#8592;</div>
                </div>
                <div className="next-button1" onClick={handleNextButtonClick}>
                    Post
                </div>
            </div>

            <div className="selected-image-container1">
                {selectedImage && <img src={selectedImage} alt="Selected" className="selected-image1" />}
            </div>

            <div>
                <div className="desc1">Description</div>
                <div className="desc">
                    <textarea
                        className="descriptionBox"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            //   handleDescription();
                        }}
                        maxLength={350}
                        placeholder=""
                    />
                </div>
                {/* {error && <div className="error-message">{error}</div>} */}
            </div>
            <div className="card-container" >
                <div className='tag-first-section'>
                    <div className="tag-icon"><FaTag /></div>
                    <div className="people-tag">Tag People</div>
                </div>
                <div className="greater-than-sign" onClick={() => handleOpensuggestion()}>&#62;</div>
            </div>
            <div className='tags-suggestion-container'>
                {showSuggestionBox && (
                    <SuggestionBox closeSuggestion={closeSuggestion} userarray={tag}
                        handleSelectUser={handleSelectUser} handleUnselectUser={handleRemoveTag}
                    />
                )}
            </div>

            {tag && tag.length > 0 && <div className="selected-tags">
                {tag.map((user) => (
                    <div key={user._id} className="tag-item"><div className="circle" onClick={() => handleRemoveTag(user._id)}>
                    <AiFillMinusCircle style={{marginTop:"4px"}}  size={16} color="black" />
                  </div>
                        @{user.userName} </div>
                ))}
            </div>}
        </div>
    );
};

export default ImageEditor;
