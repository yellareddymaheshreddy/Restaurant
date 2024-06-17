import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'


function LogoutBtn({ style }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authService.logout().then(() => {
      navigate("/")
      dispatch(logout())
    })
  }
  return (
    <button
      type="button"
      className={` bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${style ? style : ''}`}
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn    