import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import PostInfo from './components/Home/Posts/PostInfo';
import Messages from './components/Messages/Messages';
import PostInfoPage from './components/Home/Posts/PostInfoPage';
import { useState,useEffect } from 'react';
import SendPost from './components/Home/Posts/SendPost';
function App() {
  const [postContainer, setPostContainer]=useState(false)

  useEffect(() =>{
    postContainer 
    ?   document.body.style.overflow = 'hidden'
    :  document.body.style.overflow = ''
  }, [postContainer])

  return (
    <div style={{overflowY:postContainer ? "hidden" : ""}}>
      <div>
        <SendPost postContainer={postContainer} setPostContainer={setPostContainer} />
      </div>
      <div>
        <Router>
            <Routes>
                <Route path='/' element={<Register/>}/>
                <Route path='/home' element={<Home setPostContainer={setPostContainer}/>} />
                <Route path='/profile/:userNick' element={<Profile setPostContainer={setPostContainer} />} />
                <Route path='/postinfo/:postId' element={<PostInfo />} />
                <Route path='/postinfopage/:postId' element={<PostInfoPage/>} />
                <Route path='/messages' element={<Messages setPostContainer={setPostContainer}/>} />
            </Routes>
        </Router>
    </div>
    </div>
  );
}

export default App;
