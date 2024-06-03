import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, TextInput, Modal, Label } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashProfile = () => {

  const currentUser = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const {showModal , setShowModal} = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    
  }

  const handleLogout = async () => {}

  const handleDeleteUser = async () => {}



  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form action=""  className="flex flex-col gap-4">
        
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
        
        <TextInput
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser?.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser?.email}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          placeholder="phone"
          id="phone"
          onChange={handleChange}
        />
        <Label> Address : </Label>
        <TextInput
          type="text"
          placeholder="street"
          id="street"
          onChange={handleChange}
        />
        <TextInput
          type="text"
          placeholder="city"
          id="city"
          onChange={handleChange}
        />
        <TextInput
          type="text"
          placeholder="state"
          id="state"
          onChange={handleChange}
        />
        <TextInput
          type="text"
          placeholder="zip"
          id="zip"
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