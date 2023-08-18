import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { createContext, useState } from 'react';
import Home from './components/home/Home';
import Snow from './components/Snow';

const DATA = createContext();
function App() {

  const [userLogin, setUserLogin] = useState(false);
  const [currentUser,setCurrentUser] = useState({});

  
  
  return (
    <DATA.Provider value={{ userLogin, setUserLogin ,currentUser,setCurrentUser}}>
    <div className="snow"></div>
    <Snow/>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route index element={<Login />} />
        <Route path='/register' element={<Register />} />
        {
          userLogin ? 
        <Route path='/home' element={<Home />} />
          :
        <Route path='/home' element={<Navigate to ="/"/>} />

        } 
      </Routes>
    </DATA.Provider>
  );
}

export { DATA };
export default App;
