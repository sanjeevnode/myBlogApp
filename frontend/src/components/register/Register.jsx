import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {

  const { register, handleSubmit } = useForm();

  const [passwordVissible, setPasswordVissible] = useState(false)

  const registerUser = async (data)=>{
    const response = await fetch(`http://localhost:3001/register`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }

  const formSubmit = async (data, e) => {

    const  {value} = await registerUser(data);
    console.log(value);

    if (value){
      toast.success('New user created', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  e.target.reset();
    }
    else{
      toast.error('Registration failed , Either user already exists or Wrong credentials', {
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
        <form onSubmit={handleSubmit(formSubmit)}>
          <p>Register <span>Here</span> </p>
          <input placeholder='Enter your name' type='name' {...register('name', { required: true })} />
          <input placeholder='Enter your email' type='email' {...register('email', { required: true })} />
          <input placeholder="Password" type={passwordVissible ? "text" : 'password'}{...register('password', { required: true })} />
          <input placeholder='Confirm Password' type={passwordVissible ? "text" : 'password'} {...register('confirmpassword', { required: true })} />
          <div className="show-password">
            <input id='showpassword' type="checkbox" checked={passwordVissible} onChange={() => setPasswordVissible(!passwordVissible)} />
            <p>show password</p>
          </div>
          <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register
