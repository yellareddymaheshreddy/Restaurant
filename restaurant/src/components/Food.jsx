import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
// import { notifysuccess } from "./toast";
import { deletefood } from "../store/foodItemsSlice";
import { additemtocart } from "../store/cartSlice";


export default function Food() {
    const [image, setimage] = useState(0)
    const [Quantity, setQuantity] = useState(1)
    const [item, setPost] = useState({});
    const [fooditems, setfooditems] = useState()
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const { slug } = useParams();
    const s = useSelector(state => state.fooditems.fooditems)
    
    let isAuthor = item && userData ? item.Createdby === userData.$id : false;
    useEffect(() => {
        setfooditems(s)
        fooditems?.map((item) => {
            console.log(item)
            if (item.$id == slug) {
                console.log(item,'food')
                setPost(item);
            }
        })
        console.log(fooditems,'food items form food')
    }, [slug, navigate, fooditems, isAuthor])

    const dispatch = useDispatch();

    const deletePost = () => {
        // notifysuccess("deletion sucessfull!")
        dispatch(deletefood(item.$id))
        appwriteService.deleteFoodItem(item.$id)
        navigate("/")

    }


    return item ? (
        <div class="sp mx-auto max-w-[90rem] px-2 py-10 lg:px-0">
            <div class="overflow-hidden">
                <div class="mb-9 pt-4 md:px-6 md:pt-7 lg:mb-2 lg:p-8 2xl:p-10 2xl:pt-10">
                    <div class="items-start justify-between lg:flex lg:space-x-8">
                        <div class="mb-6 items-center justify-center overflow-hidden md:mb-8 lg:mb-0 xl:flex">
                            <div class="w-full xl:flex xl:flex-row-reverse">
                                <div class="relative mb-2.5 w-full shrink-0 overflow-hidden rounded-md border md:mb-3 xl:w-[480px] 2xl:w-[550px]">
                                    <div class="relative flex items-center justify-center">
                                        <img
                                            alt="Product gallery 1"
                                            src={item.Images ? item.Images[image] : ''}
                                            // src="https://images.unsplash.com/photo-1580902394724-b08ff9ba7e8a?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1548&amp;q=80"
                                            width="350"
                                            height="350"
                                            class="rounded-lg h-[350px] object-cover md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px]"
                                        />
                                    </div>
                                    <div class="absolute top-2/4 z-10 flex w-full items-center justify-between">
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
                                            class="text-white"
                                        >
                                            <polyline points="15 18 9 12 15 6"></polyline>
                                        </svg>
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
                                            class="text-white"
                                        >
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </div>
                                </div>
                                <div class="flex gap-2 xl:flex-col">
                                    <div class="border-border-base flex cursor-pointer items-center justify-center overflow-hidden rounded border transition hover:opacity-75 ">
                                        <img
                                            alt="Product 0"
                                            src={item.Images ? item.Images[0] : ""}
                                            decoding="async"
                                            loading="lazy"
                                            class="h-20 w-20 object-cover md:h-24 md:w-24 lg:h-28 lg:w-28 xl:w-32"
                                            onClick={() => {
                                                setimage(0)
                                            }}
                                        />
                                    </div>
                                    <div class="border-border-base flex cursor-pointer items-center justify-center overflow-hidden rounded border transition hover:opacity-75 ">
                                        <img
                                            alt="Product 1"
                                            src={item.Images ? item.Images[1] : ""}
                                            decoding="async"
                                            loading="lazy"
                                            class="h-20 w-20 object-cover md:h-24 md:w-24 lg:h-28 lg:w-28 xl:w-32"
                                            onClick={() => {
                                                setimage(1)
                                            }}
                                        />
                                    </div>
                                    <div class="border-border-base flex cursor-pointer items-center justify-center overflow-hidden rounded border transition hover:opacity-75 ">
                                        <img
                                            alt="Product 2"
                                            src={item.Images ? item.Images[2] : ""}
                                            decoding="async"
                                            loading="lazy"
                                            class="h-20 w-20 object-cover md:h-24 md:w-24 lg:h-28 lg:w-28 xl:w-32"
                                            onClick={() => {
                                                setimage(2)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex shrink-0 flex-col lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
                            <div className="flex justify-between items-center">

                                <div class="pb-5">
                                    <h2 class=" text-2xl font-bold">
                                        {item.Name}
                                    </h2>
                                    <p class="mt-4 font-semibold line-through">₹{item.OrderPrice}</p>
                                    <p class="mt-4 font-bold text-xl">₹{item.SalePrice}</p>
                                </div>
                                <div>
                                    <span className="text-lg font-semibold md:text-xl xl:text-2xl">Quantity:</span>
                                    <div class="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
                                        <button
                                            class="hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12 text-3xl font-normal"
                                            disabled=""
                                            onClick={()=>{
                                                if(Quantity>1)setQuantity(Quantity-1)
                                            }}
                                        >
                                            -
                                        </button>
                                        <span class="duration-250 text-heading flex h-full w-12  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24">
                                           {Quantity}
                                        </span>
                                        <button class="text-3xl font-normal hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                                        onClick={()=>{
                                            setQuantity(Quantity+1)
                                        }}>
                                            +
                                        </button>
                                    </div>
                                    <div class="mb-2 pt-0.5">
                                        <h4 class="text-15px mb-3 capitalize text-opacity-70 text-xl font-bold">
                                            Total:
                                        </h4>
                                        <ul class="flex flex-wrap space-x-2 text-2xl font-bold">
                                           {Quantity*item.SalePrice}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="pb-2"></div>
                            <div class="space-y-2.5 pt-1.5 md:space-y-3.5 lg:pt-3 xl:pt-4">
                                <button
                                    type="button"
                                    class="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    onClick={()=>{
                                        dispatch(additemtocart({Name:item.Name,OrderPrice:item.OrderPrice,SalePrice:item.SalePrice,Quantity:Quantity,ItemID:item.$id,image:item.Images}))
                                    }}
                                >
                                    Add to Cart
                                </button>

                                
                                <div class="grid grid-cols-2 gap-2.5">
                                    <button
                                        type="button"
                                        class="inline-flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="mr-3"
                                        >
                                            <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                                        </svg>
                                        <span class="block">Wishlist</span>
                                    </button>
                                    <div class="relative">
                                        <button
                                            type="button"
                                            class="inline-flex w-full items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="mr-3"
                                            >
                                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                                <polyline points="16 6 12 2 8 6"></polyline>
                                                <line x1="12" y1="2" x2="12" y2="15"></line>
                                            </svg>
                                            <span class="block">Share</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="pt-6 xl:pt-8">
                                <h3 class="text-15px mb-3 font-semibold sm:text-base lg:mb-3.5">
                                    Product Details:
                                </h3>
                                <p class="text-sm">
                                    {item.Description
                                    }
                                </p>
                            </div>
                            {true && (
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => {
                            // navigate(`/edit-ride/${ride.$id}`)
                            navigate(`/edit-ride/${item.$id}`)
                        }}
                        type="button"
                        className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black bg-green-50"
                    >
                        Edit
                    </button>
                    <button
                        onClick={deletePost}
                        type="button"
                        className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black bg-red-50"
                    >
                        Delete
                    </button>
                </div>
            )}
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </div>

    ) : null;


}
