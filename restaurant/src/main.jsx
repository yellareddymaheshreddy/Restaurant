import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Header,Footer} from './components'
import AuthLayout from './components/AuthLayout.jsx'
import LandingPage from './components/Landingpage.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import EditRide from './components/EditRide.jsx'
import CreateRide from './components/CreateRide.jsx'
// import ErrorPage from "./error-page";
import store from './store/store.js'
import Food from './components/Food.jsx'
import Cart from './components/Cart.jsx'
import Checkout from './components/Checkout.jsx'
import AllOrders from './components/AllOrders.jsx'
const router = createBrowserRouter([{
  path: "/",
  element: 
    <App />,
  errorElement: <><Header />
    {/* <ErrorPage /> */}
    <Footer />
  </>,

  children: [
    {
      path: "",
      element: <AuthLayout authentication><LandingPage />
      </AuthLayout>,
    },
    // {
    //   path: "about",
    //   element: <About />
    // },
    // {
    //   path: "contact",
    //   element: <Contact />
    // },
    {
      path: "/login",
      element: (
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      ),
    },
    {
      path: "/signup",
      element: (
        <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      ),
      
    },
    {
      path:'/allk',
      element:<AllOrders/>
    },
    
  //   {
  //     path: "/all-rides",
  //     element: (
  //         <AuthLayout authentication>
  //             {" "}
  //             <Allrides/>
  //         </AuthLayout>
  //     ),
  // },
  {
    path: "/ride/:slug",
    element: <Food />,
},
{
  path:'/cart',
  element:
  <Cart/>,
  
   
},
{
  path:'/cart/checkout',
  element:<Checkout/>
},
{
  path: "/edit-ride/:slug",
  element: (
      // <AuthLayout authentication>
          // {" "}
          <EditRide />
      // </AuthLayout>
  ),
},
{
  path: "/add-ride",
  element: (
      <AuthLayout authentication>
          {" "}
          <CreateRide />
      </AuthLayout>
  ),
},
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
