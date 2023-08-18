import React, { useContext } from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
import { DATA } from '../../App'

const Header = () => {

   const {userLogin,setUserLogin} = useContext(DATA)
    
  const navLinkStyles = ({ isActive }) => {
    return {
    color: "black",
      textDecoration: isActive ? "3px rgb(2,172,229) underline":"none" 
    };
  }
  return (
    <div className='header'>
    <NavLink to='/' style={{textDecoration:"none", color:"rgb(24,53,90)" }} onClick={userLogin?()=>setUserLogin(false):null}>
    <span>My Blog</span>
    </NavLink>
        <ul>
            <NavLink to={userLogin?'/home':'/'}   style={navLinkStyles}>
            <li>{userLogin ?"Home":"Login"}</li>
            </NavLink>
            <NavLink to={userLogin?'/':'/register'} onClick={userLogin?()=>setUserLogin(false):null}style={navLinkStyles}>
            <li>{userLogin?"Logout":"Register"}</li>
            </NavLink>
        </ul>
    </div>
  )
}

export default Header
