import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../AppWrite/auth_service";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      }).finally(() => {
        alert("You have been logged out")
        navigate("/");
      });
      
  }

  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
