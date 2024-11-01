import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { additemtocart } from '../store/cartSlice';

const Products = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const items = useSelector(state => state.fooditems.fooditems);
    return (
        <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-3">
            {items.map((item) => (
                <div key={item.Name} className="rounded-md border" >
                    <img
                        src={item.Images[0] ? item.Images[0] : ""}
                        alt="Laptop"
                        className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px] object-cover"
                        onClick={() => {
                            navigate(`/ride/${item.$id}`)
                        }}
                    />
                    <div className="p-4">
                        <h1 className="inline-flex items-center text-lg font-semibold">{item.Name}</h1>
                        <p className="mt-3 text-sm text-gray-600">
                            {item.Description}
                        </p>
                        <div className="mt-4">
                            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900 line-through">
                                ₹{item.OrderPrice}
                            </span>
                            <span className="mb-2 mr-2 inline-block rounded-full bg-green-100 px-3 py-1 text-[10px] font-semibold text-green-600">
                                {100 - ((item.SalePrice / item.OrderPrice) * 100).toFixed(2)}% off
                            </span>
                            <span className="mb-2 mr-2 inline-block rounded-full bg-green-100 px-3 py-1 text-[10px] font-semibold text-green-700">
                                save: ₹{item.OrderPrice - item.SalePrice}
                            </span>
                        </div>
                        <div className="mt-3 flex items-center space-x-2 justify-between">
                            <span className="block text-sm font-semibold">₹{item.SalePrice}</span>


                            <span className="flex items-center gap-1 text-sm font-semibold">{item.Category}
                                {item.Category == 'Non-Veg' ? <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-red-400"></span> : <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-green-400"></span>}
                            </span>


                        </div>
                        <div className="mt-5 flex items-center space-x-2 justify-between">

                            <span className=" cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium flex">
                                <img src="./timer.svg" alt="" height='15px' width={'15px'} />
                                &nbsp;5 min
                            </span>
                            <span className="flex cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                                5 &nbsp;
                                <img src="./star.svg" alt="" height='15px' width={'15px'} />

                            </span>
                            <span className="flex items-center cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium text-green-500">
                            <img src="delivery.svg" alt="" height='20px' width={'20px'} />
                            &nbsp;Free 
                                
                            </span>
                        </div>
                        <button
                            type="button"
                            class="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            onClick={() => {
                                dispatch(additemtocart({ Name: item.Name, OrderPrice: item.OrderPrice, SalePrice: item.SalePrice, Quantity: 1, ItemID: item.$id, image: item.Images }))
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Products
