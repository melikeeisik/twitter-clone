import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import Register from './pages/Register';
import PostInfo from './pages/PostInfo';
import Messages from './pages/Messages';
import PostInfoPage from './pages/PostInfoPage';
import { useState,useEffect } from 'react';
import SendPost from './components/SendPost/SendPost';
function App() {
  const [postContainer, setPostContainer]=useState(false)

  useEffect(() =>{
    postContainer 
    ?   document.body.style.overflow = 'hidden'
    :  document.body.style.overflow = ''
  }, [postContainer])

  return (
    <div style={{overflowY:postContainer ? "hidden" : ""}}>
        <SendPost postContainer={postContainer} setPostContainer={setPostContainer} />
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
  );
}

export default App;
