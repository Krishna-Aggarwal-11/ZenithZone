import React, { useState } from 'react'
import {  Button, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,[e.target.id]:e.target.value.trim()
    });
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className=' mx-auto max-w-xl p-3'>
      <h1 className='px-3 text-3xl text-center py-3  m-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg '>Login</h1>
        <div className='flex-1 items-center'>
          <form className='flex flex-col gap-4' action="" >
           
            <div >
              <Label value='Email'/>
              <TextInput type='email' placeholder='email' id='email' onChange={handleChange}/>
            </div>
            <div >
              <Label value='Password'/>
              <TextInput type='password' placeholder='password' id='password' onChange={handleChange}/>
            </div>
            <Button className=' max-w-xs ml-auto mr-auto' gradientDuoTone="purpleToBlue" outline type='submit'>{
              'Login'
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