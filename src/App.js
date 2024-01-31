import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profile from './components/Profile';
import Register from './components/Register';
import SignUp from './components/SignUp';
import Login from './components/Login';
function App() {
  return (
    <div >
      <div>
        <Router>
            <Routes>
                <Route path='/' element={<Register/>}/>
                <Route path='/home' element={<Home/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/login' element={<Login/>} />
            </Routes>
        </Router>
    </div>
    </div>
  );
}

export default App;
