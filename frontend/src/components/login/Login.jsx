import React, { useContext, useState } from 'react'
import './Login.css'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer ,toast} from 'react-toastify';
import { DATA } from '../../App';


const Login = () => {


  const {setUserLogin,setCurrentUser} = useContext(DATA);

  const [passwordVissible,setPasswordVissible] =useState(false)

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const loginUser = async (data)=>{
    const response = await fetch(`http://localhost:3001/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }

  const formSubmit=async(data)=>{
    const {value,id,name,email} = await loginUser(data);

    if(value){
      setUserLogin(true)
      setCurrentUser({id,name,email})
      toast.success('Authentication Sucessfull', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     navigate('/home');
    }
    else{
      toast.error('Authentication Failed !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div className="login-container">
      <ToastContainer />
        <div className='container'>
        <form  onSubmit={handleSubmit(formSubmit)}>
            <p>Login <span>Here</span> </p>
            <input placeholder='Enter your email' type='email' {...register('email', { required: true })}/>
            <input  placeholder="Password" type={passwordVissible ? "text": "password"} {...register('password', { required: true })}/>
            <div className="show-password">
          <input id='showpassword' type="checkbox" checked={passwordVissible} onChange={()=>setPasswordVissible(!passwordVissible)} />
          <p>show password</p>
          </div>
            <button type='submit'>Login</button>
        </form>
    </div>
    </div>
  )
}

export default Login
