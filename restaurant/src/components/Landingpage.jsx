import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landingpage = () => {

    const navigate = useNavigate();
    const username = useSelector(state => state.auth.userData.name);
    const items = useSelector(state => state.fooditems.fooditems);
    
    // const images = ["journeytruck1.jpg", "journeytruck.jpg"];
    return (
        <div className="w-full" >
            <div className="relative w-full bg-white">
                <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
                    <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
                        <div className='mnmsg'>
                        <div className='font-medium text-base px-3 capitalize'>Hi {username},</div>
                            
                        <div className=' font-medium text-2xl px-3'>Welcome to <span className='animate-pul'>Teleport</span></div>
                        </div>
                        <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-gray-100 p-1">
                            <div className="rounded-full bg-white p-1 px-2">
                                <p className="text-sm font-medium">Happy&#x27; </p>
                            </div>
                            <p className="text-sm font-medium">Journey →</p>
                        </div>
                        <h1 className="mt-8 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
                            Make friends by travelling
                        </h1>
                        <p className="mt-8 text-lg text-gray-700">
                            Service to others is the rent you pay for your room here on earth.
                        </p>
                        <div className="my-8 flex items-center justify-center gap-6 space-x-2">
                            <div className='flex gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" height="50px" width="50px" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="5.5" cy="17.5" r="3.5"></circle> <circle cx="18.5" cy="17.5" r="3.5"></circle> <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h2"></path> </g></svg>

                                <div className='bg-gradient-to-r from-indigo-500 to-pink-500 p-[2px] rounded-full h-max self-center'>
                                <button
                                    onClick={() => {
                                        navigate("/add-ride")
                                    }}
                                    type="button"
                                    className="rounded-full bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                    Post Ride
                                </button>
                                    </div>

                            </div>

                            <div className='flex gap-2 flex-row-reverse'>
                                <svg fill="#161313" height="50px" width="50px" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="79 -152 413.5 561" xmlSpace="preserve" stroke="#161313"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M230.4-103.3c0-25.5,20.7-46.2,46.2-46.2c25.5,0,46.2,20.7,46.2,46.2c0,25.5-20.7,46.2-46.2,46.2 C251.1-57.1,230.4-77.8,230.4-103.3z M467.8,169.1h-20.1v157.2h20.1c14.4,0,21.7-11.3,21.7-21.6c0,0,0-113.3,0-114 C489.4,180.5,481.3,169.1,467.8,169.1z M407.2,169h29.5v157.2H332v54.1c0,36.2-53.2,35.1-53.2,0V169.1h-8.8v211.1 c0,35.1-52.8,36.2-52.8,0V13.5L92.5-113.4c-21.5-21.5,9.9-52.9,31.4-31.3L221.4-45l102.5-0.1c32.1,0,56.2,29.8,56.2,58.1v122.2 c8.6,0,13.7,0,13.7,0c8.6,0,13.5,4.2,13.5,12.3V169z M341.4,27.4H332V169h9.4v-21.3v-0.2V27.4z M394.2,147.8h-40.3v21.3h40.3V147.8z "></path> </g></svg>

                                <div className='p-[2px] bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full h-max self-center'>
                                <button
                                    onClick={() => {
                                        navigate("/all-rides");
                                    }}
                                    type="button"
                                    className="rounded-full bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black "
                                    >
                                    Get Ride
                                </button>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden relative lg:col-span-5 lg:block lg:-mr-8 xl:col-span-6">
                        {/* <Carousel image={images[1]} /> */}
                    </div>
                </div>
            </div>
            <div>
            <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
                        {items.map((item) => (
                            <div key={item.Name} className="rounded-md border" onClick={() => {
                                navigate(`/ride/${item.$id}`)
                              }}>
                                <img
                                    src={item.Images[0] ? item.Images[0] : ""}
                                    alt="Laptop"
                                    className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px] object-cover"
                                />
                                <div className="p-4">
                                    <h1 className="inline-flex items-center text-lg font-semibold">{item.Name}</h1>
                                    <p className="mt-3 text-sm text-gray-600">
                                        {item.Description}
                                    </p>
                                    <div className="mt-4">
                                        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                                            #Sneakers
                                        </span>
                                        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                                            #Nike
                                        </span>
                                        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                                            #Airmax
                                        </span>
                                    </div>
                                    <div className="mt-3 flex items-center space-x-2">
                                        <span className="block text-sm font-semibold">Colors : </span>
                                        <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-red-400"></span>
                                        <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-purple-400"></span>
                                        <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-orange-400"></span>
                                    </div>
                                    <div className="mt-5 flex items-center space-x-2">
                                        <span className="block text-sm font-semibold">Size : </span>
                                        <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                                            8 UK
                                        </span>
                                        <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                                            9 UK
                                        </span>
                                        <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                                            10 UK
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

            </div>


        </div>
    )
}

export default Landingpage
