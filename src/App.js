import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profile from './components/Profile';
import Register from './components/Register';
function App() {
  return (
    <div >
      <div>
        <Router>
            <Routes>
                <Route path='/' element={<Register/>}/>
                <Route path='/home' element={<Home/>} />
                <Route path='/profile' element={<Profile/>} />
            </Routes>
        </Router>
    </div>
    </div>
  );
}

export default App;
