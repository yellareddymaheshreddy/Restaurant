import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify'
// import { setrides } from './store/ridesSlice'
import { setfood } from './store/foodItemsSlice'
import service from './appwrite/config'



function App() {

  const [loading, setLoading] = useState(true)
  // const [prompt, setprompt] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    // window.addEventListener('beforeinstallprompt', (e) => {
    //     setprompt(e);
    // });

    service.getFoodItems().then((items) => {
      if (items) {
        dispatch(setfood(items.documents))
        console.log("setting food items to store")
      
      }
    })
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))

        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])
  // const install = async () => {
  //   if (prompt !== null) {
  //     prompt.prompt();
  //     const { outcome } = await prompt.userChoice;
  //     if (outcome === 'accepted') {
  //       setprompt(null)
  //     }
  //   }
  // }

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between' >
      {/* <ToastContainer /> */}
      <div className='w-full block'>
        {/* <Navbar install={install} /> */}
        <Header />
        <main>
          <Outlet /> 
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div>
      {/* <Loading /> */}
      Loading......
    </div>
  )
}

export default App