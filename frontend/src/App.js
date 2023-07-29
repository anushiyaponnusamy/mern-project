
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Feed from './feed';
import FeedPhoto from './imagePage/feedPhoto';
import ImageGrid from './imagePage/imageGrid';
import CreatePost from './create/createPost';
import ImageEditor from './create/imageEditor';
import CreatePage from './create/createPage';
import FinalCreate from './create/finalCreate';
import LoginAndSignUp from './AppLogin';

const isUserAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; 
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginAndSignUp />} />
        <Route path="/login" element={<LoginAndSignUp />} />
        <Route path="/signUp" element={<LoginAndSignUp />} />
        {isUserAuthenticated() 
        ?<>
        
        <Route path="/imageGrid" element={<ImageGrid />}/>
        <Route path="/imageEditor" element={<ImageEditor />}/>
        <Route path="/createPost" element={<CreatePost />}/>
        <Route path="/feedPhoto" element={<FeedPhoto />}/>
        <Route path="/create" element={<CreatePage />}/>
        <Route path="/finalCreate" element={<FinalCreate />}/>
        </> :
        <Route path="/login" element={<LoginAndSignUp />} /> 
      }
      </Routes>
    </Router>
  );
};

export default App;
