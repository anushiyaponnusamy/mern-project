import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './imageEditor.css'
const ImageEditor = (props) => {
  const storedToken = localStorage.getItem('token');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [disableNext, setDisableNext] = useState(false);

  const [image, setImage] = useState('');
  const location=useLocation()
  const navigate=useNavigate();
  const [selectedImage,setSelectedImage]=useState(location.state?.selectedImageURL)
  
  const [selectedFile,setSelectedFile]=useState(location.state?.selectedFile)
  const handleAspectRatioChange = (event) => {
    setAspectRatio(event.target.value);
    // setDisableNext(true)
  };

  const handleGoBack = () => {
    navigate('/createPost')
  };

  const handleNextButtonClick = async() => {
    if(disableNext) return;
    setDisableNext(true)
        const formData = new FormData();
    formData.append('image', selectedFile);
    console.log('selectedimg',selectedFile)
        
        try {
          const headers = {
            'Authorization': `Bearer ${storedToken}`, // Example authorization header
          };
          const response = await axios.post('http://localhost:3001/uploadImage',formData,{headers});
          if (response.data) {
            setImage(response.data)
          
          }
        } catch (error) {
      setDisableNext(false)
        }
        setDisableNext(false)
    
  };
useEffect(()=>{if(image){
  navigate('/finalCreate', { state: { selectedImageURL: image,aspectRatio } });
}},[image])
  return (
    <div className="image-editor">
      <div className="top-section">
        <div className="arrow-container1" onClick={handleGoBack} >
        <div className="left-arrow1">&#8592;</div>
      </div>
        <div className="next-button" onClick={handleNextButtonClick}>
          Next
        </div>
      </div>

      <div className="selected-image-container">
        {selectedImage && <img src={selectedImage} alt="Selected" className='selected-image'/>}
      </div>

      <div className="aspect-ratio-selector" >
        <div className="aspect-ratio-option"  onClick={()=>handleAspectRatioChange({ target: { value: '16:9' } })}>
          
      
        <div style={{height:"35px",width:"35px"}} className={aspectRatio === '16:9' ? "image-border": ''}> 
         {selectedImage && <img src={selectedImage} alt="Selected" className='ratio-image' />}</div>
        <div>  <input
            type="radio"
            value="16:9"
            checked={aspectRatio === '16:9'}
            onChange={handleAspectRatioChange}
            id="aspect-16-9"
          />
          <label htmlFor="aspect-16-9">16:9</label></div>
        </div>
        <div className="aspect-ratio-option"  onClick={()=>handleAspectRatioChange({ target: { value: '4:3' } })}>
          
       
        <div style={{height:"35px",width:"35px"}} className={aspectRatio === '4:3' ? "image-border": ''}>
          {selectedImage && <img src={selectedImage} alt="Selected" className='ratio-image'/>}
         </div><div> <input
            type="radio"
            value="4:3"
            checked={aspectRatio === '4:3'}
            onChange={handleAspectRatioChange}
            id="aspect-4-3"
          />
          <label htmlFor="aspect-4-3">4:3</label></div>
        </div>
        <div className="aspect-ratio-option"  onClick={()=>handleAspectRatioChange({ target: { value: '1:1' } })}>
          
        <div style={{height:"35px",width:"35px"}} className={aspectRatio === '1:1' ? "image-border": ''}>
          {selectedImage && <img src={selectedImage} alt="Selected" className='ratio-image'/>}</div>
         <div>
         <input
            type="radio"
            value="1:1"
            checked={aspectRatio === '1:1'}
            onChange={handleAspectRatioChange}
            id="aspect-1-1"
          />
          <label htmlFor="aspect-1-1">1:1</label>
        </div> 
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
