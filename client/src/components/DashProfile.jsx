import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, TextInput, Modal, Label } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { logout , deleteStart, deleteSuccess, deleteFailure, updateStart, updateFailure, updateSuccess  } from "../redux/user/userSlice.js";

const DashProfile = () => {
  const dispatch = useDispatch();
  const {currentUser, loading, error} = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateErrorMessage, setUpdateErrorMessage] = useState('');
  const [updateSuccessMessage, setUpdateSUccessMessage] = useState('');
  const [showModal , setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateErrorMessage('');
    setUpdateSUccessMessage('');
    if (Object.keys(formData).length === 0) {
      setUpdateErrorMessage('Please add all fields');
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.errorMessage));
      } else {
        dispatch(updateSuccess(data));
        setUpdateSUccessMessage("Profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateErrorMessage(error.message);
    }
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/user/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.errorMessage);
      } else {
        dispatch(logout(data));
      }
    } catch (error) {}
  }

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteFailure(data.errorMessage));
      } else {
        dispatch(deleteSuccess(data));
      }
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };



  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form action=""  className="flex flex-col gap-4"  onSubmit={handleSubmit}>
        
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full " >

          <img
            src={currentUser?.profilePic}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] 
              "opacity-60"
            }`}
          />
        </div>
        <Label>Username : </Label>
        <TextInput
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser?.username}
          onChange={handleChange}
        />
        <Label> Email : </Label>
        <TextInput
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser?.email}
          onChange={handleChange}
        />
        <Label> Phone : </Label>
        <TextInput
          type="text"
          placeholder="phone"
          id="phone"
          defaultValue={currentUser?.phone}
          onChange={handleChange}
        />
        <Label> Address : </Label>
        <TextInput
          type="text"
          placeholder="address"
          id="address"
          defaultValue={currentUser?.address }
          onChange={handleChange}
        />
        <Label>Password : </Label>
        <TextInput
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />        
        <Button
          type="submit"
          gradientDuoTone={"purpleToBlue"}
          outline
          className="self-center"
          disabled={loading }
        >
          {loading ? "Loading" : "Update"}
        </Button>
        
      </form>
      <div className="text-red-500 flex justify-between mt5">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleLogout} className="cursor-pointer">
          Logout
        </span>
      </div>

      {updateSuccessMessage && (
        <Alert color="success" className='mt-5'>
          {updateSuccessMessage}
        </Alert>
      )}
      {updateErrorMessage && (
        <Alert color="fallure" className='mt-5'>
          {updateErrorMessage}
        </Alert>
      )}
      {error && (
        <Alert color="fallure" className='mt-5'>
          {error}
        </Alert>
      )}

      
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashProfile