import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import image from '../../bg.jpeg'
import { DATA } from '../../App';
import { useForm } from 'react-hook-form';
const Home = () => {
  const { currentUser } = useContext(DATA);

  const { register, handleSubmit } = useForm();

  const [posts, setPost] = useState([])
  let newArray = [...posts];

  const formSubmit = async (data,e) => {
    data.useremail=currentUser.email;
    setPost([...posts, data])
    e.target.reset();
    await fetch(`http://localhost:3001/create_post`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const getPosts = async () => {
    const res = await fetch(`http://localhost:3001/get_posts/${currentUser.email}`);
    const result = await res.json();
    setPost(result);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (

    <div className='home'>
      <div className="first-container">
        <div className="user-profile">
          <div className="user-details">
            <p id="userprofile">User <span >Profile</span></p>
            <img src={image} alt="" />
            <p>Name : <span>{currentUser.name}</span></p>
            <p>Email : <span>{currentUser.email}</span></p>
          </div>
        </div>
        <div className="posts">
          <p id="idaddposts">Add <span >Posts</span></p>

          <form onSubmit={handleSubmit(formSubmit)} className="add-posts">
            <div className="post-detail">
              <input type="text" placeholder='Post title'  {...register("title")} />
              <input type="text" placeholder='Post image url' {...register("imgurl",{required:true})} />
              <button>Add post</button>
            </div>
            <textarea name="" id="" cols="50" rows="5" placeholder='post description ....' {...register("description",{required:true})} />
          </form>

        </div>

      </div>
      <div className="post-container">
        {

          newArray.reverse().map((e, i) => {
            return (
              <div key={i} className="post-card">
                <img src={e.imgurl} alt=''/>
                <p id="post-title">{e.title}</p>
                <p id='post-desc'> Description :{e.description}</p>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default Home
