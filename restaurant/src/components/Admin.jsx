import React,{useState} from 'react'
import Products from './Products'
import AllOrders from './AllOrders'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Admin = () => {
    const [products, setProducts] = useState(true)
    const items = useSelector(state => state.fooditems.fooditems);
    const navigate =useNavigate();
    return (
        <section class="w-full">
            <div class="mx-auto max-w-7xl px-2 py-10 lg:px-10">
                <div class="md:flex md:flex-row md:items-start md:justify-between">
                    <h1 class="text-xl font-bold">Products</h1>
                    <div class="mt-6 flex items-center  pt-2 md:mt-0 md:space-x-4  md:pt-0">
                        <button
                            onClick={()=>{
                                navigate('/add-ride')
                            }}
                            type="button"
                            class="nline-flex items-center  rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mr-4"
                        >
                            Add Product
                            
                        </button>
                        <button
                            type="button"
                            class="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Category{" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="ml-2 h-4 w-4"
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                        <button
                            onClick={()=>{
                                setProducts(false)
                            }}
                            type="button"
                            class="inline-flex items-center  rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mr-4"
                        >
                            Orders
                            
                        </button>
                        <button
                        onClick={()=>{
                            setProducts(true)
                        }}
                            type="button"
                            class="inline-flex items-center  rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mr-4"
                        >
                            Products
                            
                        </button>
                    </div>
                </div>
                <hr class="my-8" />
                <div class="lg:grid lg:grid-cols-12 lg:gap-x-6">
                    <div class="hidden space-y-6 divide-y lg:col-span-3 lg:block">
                        <div>
                            <ul class="space-y-2">
                                {items?.map((item)=>(

                                <li key={item.Name}
                                onClick={()=>{
                                    navigate(`/ride/${item.$id}`)
                                }}
                                class="cursor-pointer font-medium">{item.Name}</li>
                                ))}
                                
                            </ul>
                        </div>
                        <div class="flex flex-col justify-between pt-4">
                            <h6 class="font-semibold flex items-center justify-between">Filter <span class="block cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="h-4 w-4"
                                >
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </span></h6>
                            
                            <div>
                            <ul class="space-y-2">
                                

                                <li class="cursor-pointer font-medium text-sm">Today</li>
                                <li class="cursor-pointer font-medium text-sm">Delivered</li>
                                <li class="cursor-pointer font-medium text-sm">Pending</li>
                                <li class="cursor-pointer font-medium text-sm">On Way</li>
                              
                                
                            </ul>
                        </div>
                        </div>
                        <div class="flex items-center justify-between pt-4">
                            <h6 class="font-semibold">Size</h6>
                            <span class="block  cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="h-4 w-4"
                                >
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="h-full w-full rounded-lg border-2 border-dashed px-2 lg:col-span-9 lg:min-h-min">
                        {products?<Products/>: <AllOrders/>}
                   
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Admin
