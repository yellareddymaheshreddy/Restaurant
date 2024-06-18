import React from 'react'
import { NavLink } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import '../index.css'

const Header = () => {

  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();
  const [menu, setmenu] = React.useState(false)

  return (
    <div className="relative w-full">
      {/* //side menu */}
      {menu && (<div className='absolute w-screen h-screen z-10 backdrop-blur-[3px] ' onClick={() => {
        setmenu(!menu)
      }}>
        <div className='absolute right-[23px] top-[80px] bg-[#f6f6f6] rounded-xl p-8 w-[12rem] black-shadow font-bold z-50'>
          <ul className="menu bg-base-200 w-fit rounded-box flex flex-col gap-4">
            <li>
              <NavLink className={({ isActive }) => `flex gap-2 items-center hover:text-fuchsia-600 ${isActive ? "text-fuchsia-600" : ""}`} to={"/"} onClick={() => { setmenu(false) }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => `flex gap-2 items-center hover:text-fuchsia-600 ${isActive ? "text-fuchsia-600" : ""}`} to={"/about"} onClick={() => { setmenu(false) }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                About
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => `flex gap-2 items-center hover:text-fuchsia-600 ${isActive ? "text-fuchsia-600" : ""}`} to={"/all-rides"} onClick={() => { setmenu(false) }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                All Rides
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => `flex gap-2 items-center hover:text-fuchsia-600 ${isActive ? "text-fuchsia-600" : ""}`} to={"/contact"} onClick={() => { setmenu(false) }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                Contact Us
              </NavLink>
            </li>
            <li className='text-center'>
              <button
                onClick={'install'}
                type="button"
                className={` bg-green-400 px-3 py-2 text-sm hover:bg-green-600  rounded-full w-full border border-green-600`}
              >
                Install
              </button>
            </li>
            <li className='text-center'>
              <LogoutBtn style="bg-fuchsia-600 rounded-full w-full border border-fuchsia-900 " />
            </li>

          </ul>
        </div>
      </div>)}
      <div className="mx-auto flex min-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8 min-h-24">
        <div className="inline-flex items-center space-x-2" onClick={() => {
          navigate("/")
        }}>
          <span>
            <img src="/favicon.svg" alt="" height={35} width={35} />
          </span>
          <span className="font-bold text-xl">Teleport</span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8 font-bold">
            <li>
              <NavLink className={({ isActive }) => `flex gap-2 items-center hover:text-fuchsia-600 ${isActive ? "text-fuchsia-600" : ""}`} to={"/"} onClick={() => { setmenu(false) }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => `flex gap-2 items-center hover:text-fuchsia-600 ${isActive ? "text-fuchsia-600" : ""}`} to={"/all-rides"} onClick={() => { setmenu(false) }}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> */}
                All Rides
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => `flex gap-2 items-center hover:text-fuchsia-600 ${isActive ? "text-fuchsia-600" : ""}`} to={"/about"} onClick={() => { setmenu(false) }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                About
              </NavLink>
            </li>

            <li>
              <NavLink className={({ isActive }) => `flex gap-2 items-center hover:text-fuchsia-600 ${isActive ? "text-fuchsia-600" : ""}`} to={"/contact"} onClick={() => { setmenu(false) }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                Contact Us
              </NavLink>
            </li>




            {/* <li>
              <NavLink
                to="/"
                className={({ isActive }) => `text-sm font-semibold  hover:text-gray-900 ${isActive ? "text-red-500" : "text-gray-800"}`}
              // className="text-sm font-semibold text-gray-800 hover:text-gray-900"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                // className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                className={({ isActive }) => `text-sm font-semibold  hover:text-gray-900 ${isActive ? "text-red-500" : "text-gray-800"}`}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                // className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                className={({ isActive }) => `text-sm font-semibold  hover:text-gray-900 ${isActive ? "text-red-500" : "text-gray-800"}`}
              >
                Contact
              </NavLink>
            </li> */}
          </ul>
        </div>
        <div className="hidden lg:block">
          <button
            //    onClick={install}
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mr-4"
          >
            Install
          </button>

          {authStatus && <LogoutBtn style="rounded-md" />}
          {!authStatus && <span> <button
            onClick={() => navigate("/login")}
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mr-3"
          >
            Login
          </button>
            <button
              onClick={() => navigate("/signup")}
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Sign Up
            </button>
          </span>}
        </div>
        <div className='flex gap-2 items-center'>
          
          <div >
            <button
              onClick={() => navigate("/cart")}
              type="button"
              className="rounded-md bg-white px-2 py-1 text-xl font-black text-black shadow-sm shadow-black hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black flex"
            >
              <img src="./cart.svg" alt="cart" width={'25px'} height={'25px'} className=' drop-shadow-2xl' />
            </button>
          </div>

          <div className="lg:hidden" onClick={() => { setmenu(!menu) }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 cursor-pointer"
            >
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Header
