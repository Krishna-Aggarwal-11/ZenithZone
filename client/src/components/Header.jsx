import React from "react";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { CiShoppingCart} from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/userSlice.js";


const Header = () => {
  const path = useLocation().pathname;
  
  const {currentUser: user} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async() => {
    
    try {
      const res = await fetch('/api/user/logout',{
        method:'POST',
      });
      const data = await res.json();;
      if (!res.ok) {
        console.log(data.errorMessage)
      }else{
        dispatch(logout(data));
      }
    } catch (error) {
      
    }
  }

  return (
    <Navbar className="border-b-2">
      <Link
        to={"/"}
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        Zenith
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg ">
          Zone
        </span>
      </Link>
      
      <div className="flex gap-2 md:order-2">
        
        {user ? (
          <Dropdown arrowIcon={false} inline label={
            <Avatar alt="user" img={user.profilePic} rounded />
          } >
            <Dropdown.Header>
              <span className="block text-sm">@{user.username}</span>
              <span className="block text-sm font-medium truncate">{user.email}</span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider/>
            <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to={"/signin"}>
            <Button className="w-12 h-10" color="gray" pill>
              Login
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/products"} as={"div"}>
          <Link to={"/products"}>Products</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/carts"} as={"div"}>
          <Link to={"/carts"}><CiShoppingCart className="text-2xl" /></Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
