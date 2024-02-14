import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import PostInfo from './components/Home/Posts/PostInfo';
import Messages from './components/Messages/Messages';
function App() {
  return (
    <div >
      <div>
        <Router>
            <Routes>
                <Route path='/' element={<Register/>}/>
                <Route path='/home' element={<Home/>} />
                <Route path='/profile/:userNick' element={<Profile/>} />
                <Route path='/postinfo/:postId' element={<PostInfo/>} />4
                <Route path='/messages' element={<Messages/>} />
            </Routes>
        </Router>
    </div>
    </div>
  );
}

export default App;
