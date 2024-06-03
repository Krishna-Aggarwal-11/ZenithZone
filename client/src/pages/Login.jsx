import React, { useState } from 'react'
import {  Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Link , useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSucess } from '../redux/user/userSlice';

const Login = () => {
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const {loading , error:errorMessage} = useSelector((state) => state.user);

  const navigate = useNavigate();



  const handleChange = (e) => {
    setFormData({
      ...formData,[e.target.id]:e.target.value.trim()
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return dispatch(loginFailure("Please add all fields"));
    }

    try {
      dispatch(loginStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json();
      if (res.ok) {
        dispatch(loginSucess(data));
        navigate("/");
      } else {
        dispatch(loginFailure(data.message));
      }
    }catch (error) {
      dispatch(loginFailure(error.message));
    }

  }


  return (
    <div className='min-h-screen mt-20'>
      <div className=' mx-auto max-w-xl p-3'>
      <h1 className='px-3 text-3xl text-center py-3  m-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg '>Login</h1>
        <div className='flex-1 items-center'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
           
            <div >
              <Label value='Email'/>
              <TextInput type='email' placeholder='email' id='email' onChange={handleChange}/>
            </div>
            <div >
              <Label value='Password'/>
              <TextInput type='password' placeholder='password' id='password' onChange={handleChange}/>
            </div>
            <Button className=' max-w-xs ml-auto mr-auto' gradientDuoTone="purpleToBlue" disabled={loading} outline type='submit'>{
              loading ? <>
              <Spinner size={"sm"}/>
              <span className='pl-2'>Loading...</span>
              </> : 'Login'
            }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5 '>
            <span>Don't Have an account?</span>
            <Link to={'/signup'} className='text-blue-500'>Register</Link>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Login