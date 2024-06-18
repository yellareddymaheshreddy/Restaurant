import React from 'react'
import { useForm } from 'react-hook-form'
import appwriteservice from '../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ID } from 'appwrite'
// import { notifyfail, notifysuccess } from './toast'
import { addfood,updatefood } from '../store/foodItemsSlice'

const FoodForm = ({ item }) => {
    const [images, setimages] = React.useState([])
    const [number, setNumber] = React.useState(0)
    const date = new Date().getFullYear() + "-0" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
    const listofvechicles = ['Veg','Non-Veg'];
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.userData)
    const { register, handleSubmit } = useForm({
        defaultValues: {
            Name: item?.Name || '',
            Description: item?.Description || '',
            Category: item?.Category || 'Non-Veg',
            Status: item?.Status || 'Active',
            Images: item?.Images || '',
            $id: item?.$id || "",
            SalePrice:item?.SalePrice|| '',
            OrderPrice:item?.OrderPrice || '',

        }
    });
    const navigate = useNavigate();
    const submit = async (data) => {
        console.log("submt")
        if (item) {
            dispatch(updatefood({data,$id:item.$id}))
            const dbitem = await appwriteservice.updateFoodItem(item.$id, { ...data})
            if (dbitem) {
                navigate(`/ride/${item.$id}`)
            }
            // notifysuccess("Ride Updated Successfully!")

        }
        else {
            const uniqueid = ID.unique();
            console.log("createing food item")
            dispatch(addfood({ ...data,Images:data.Images.split(',') ,Status: data.Status,$id:uniqueid}))
            console.log(data.OrderPrice)
            navigate(`/ride/${uniqueid}`)
            const dbride = await appwriteservice.createFoodItem(
                uniqueid,{
                ...data,
                Images:data.Images.split(',') ,
                Status: Number(data.Status),
            })
            if (dbride) {
                // notifysuccess("Ride Created Successfully!")
            } else {
                // notifyfail("something went wrong when createing file on server")
            }
        }

    }
    return (

        <div className="mx-auto my-4 max-w-4xl md:my-6">
            <div className="overflow-hidden  rounded-xl shadow">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="mx-3 px-2 py-6 text-gray-900 md:px-8 shadow-lg rounded-lg border overflow-hidden">
                        <div className="flow-root">
                            <div className="-my-6 divide-y divide-gray-200">
                                <div className="py-6">
                                    <form onSubmit={handleSubmit(submit)} >
                                        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                                            <div>
                                                <h3
                                                    id="contact-info-heading"
                                                    className="text-lg font-semibold text-gray-900"
                                                >
                                                    Item information
                                                </h3>
                                                <div className="mt-4 w-full">
                                                    <label
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        htmlFor="name"
                                                    >
                                                        Name :
                                                    </label>
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="text"
                                                        placeholder="Chicken Biryani"
                                                        id="name"
                                                        {...register("Name", { required: true })}
                                                    />
                                                </div>
                                                <div className="mt-4 w-full">
                                                    <label
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        htmlFor="name"
                                                    >
                                                        Description :
                                                    </label>
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="text"
                                                        placeholder="A tasty spicy biryani"
                                                        id="name"
                                                        {...register("Description", { required: true })}

                                                    />
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="mt-5">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Category details
                                                </h3>
                                                <div className="mt-2 grid  gap-x-4 gap-y-4 sm:grid-cols-4">

                                                    <div className="col-span-2 ">
                                                    <label
                                                            htmlFor="cvc"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Category Type:
                                                        </label>
                                                        <div className="mt-1">
                                                            <select defaultValue={"Bike"} name="vechicle" id="vechicle" className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                {...register("Category", { required: true })}
                                                                placeholder="Car"
                                                            >

                                                                {listofvechicles.map((Category) => <option key={Category} value={Category}>{Category}</option>
                                                                )}
                                                            </select>

                                                        </div>
                                                    </div>
                                                    <div className='w-max'>
                                                        <label
                                                            htmlFor="cvc"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Status:
                                                        </label>
                                                        <div className="mt-1">
                                                        <select name="vechicle" id="vechicle" className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                {...register("Status", { required: true })}
                                                                placeholder="Active"
                                                            >

                                                                <option value='Active'>{'Active'}</option>
                                                                <option value={'Disable'}>{'Disable'}</option>
                                                                
                                                            </select>

                                                            {/* <input
                                                                min={1}
                                                                placeholder='1'
                                                                type="number"
                                                                name="cvc"
                                                                id="cvc"
                                                                autoComplete="csc"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                {...register("Status", { required: true })}
                                                            /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="mt-5">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Image Links
                                                </h3>
                                                <div className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-3">
                                                    <div className="sm:col-span-3">
                                                        <label
                                                            htmlFor="address"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Images
                                                        </label>
                                                        <div className="mt-1">
                                                            <textarea name="" id=""
                                                            onInput={(e)=>{
                                                                setimages(e.target.value.split(','))
                                                                console.log('hello capture',images,typeof(images))
                                                            }}
                                                            placeholder='Enter 3 links separated by (,) comma.'
                                                            className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                                                            {...register("Images", { required: true })}>

                                                            </textarea>
                                                            

                                                        </div>
                                                    </div>
                                                    <div className='w-max'>
                                                        
                                                    </div>


                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="mt-5">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Price Details!
                                                </h3>
                                                <div className="sm:col-span-3">
                                                        <label
                                                            htmlFor="address"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Order Price:
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="address"
                                                                onChangeCapture={()=>{
                                                                    console.log('change')
                                                                }}
                                                                name="Price"
                                                                
                                                                placeholder='₹699'
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                {...register("OrderPrice", { required: true })}

                                                            />

                                                        </div>
                                                    </div>
                                                <div className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-3">
                                                    
                                                    <div className="sm:col-span-3">
                                                        <label
                                                            htmlFor="address"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Sale Price:
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="address"
                                                                name="price"
                                                                autoComplete="price"
                                                                placeholder='₹599 '
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                {...register("SalePrice", { required: true })}

                                                            />

                                                        </div>
                                                    </div>
                                                    


                                                </div>
                                            </div>
                                            <div className="mt-5 flex justify-end border-t border-gray-200 pt-6">

                                                <button
                                                    type="submit"
                                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                >
                                                    {item ? "Update" : "Submit"}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 px-5 py-6 md:px-8">
                    <div class="w-full ">
                                <div class="relative mb-2.5 w-full shrink-0 overflow-hidden rounded-md border md:mb-3 ">
                                    <div class="relative flex items-center justify-center">
                                        <img
                                            alt={images.length>0?images[0]:'Product 1'}
                                            src={images?images[number]:''}
                                            // src={item.Images ? item.Images[image] : ''}
                                            // src="https://images.unsplash.com/photo-1580902394724-b08ff9ba7e8a?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1548&amp;q=80"
                                            width="350"
                                            height="350"
                                            class="rounded-lg h-[350px] object-cover "
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
                                <div class="flex gap-2">
                                    <div class="border-border-base flex cursor-pointer items-center justify-center overflow-hidden rounded border transition hover:opacity-75 ">
                                        <img
                                            alt={images.length>0?images[0]:'Product 1'}
                                            src={images?images[0]:''}
                                            decoding="async"
                                            loading="lazy"
                                            class="h-20 w-20 object-cover md:h-24 md:w-24 lg:h-28 lg:w-28 xl:w-32"
                                            onClick={() => {
                                                setNumber(0)
                                            }}
                                        />
                                    </div>
                                    <div class="border-border-base flex cursor-pointer items-center justify-center overflow-hidden rounded border transition hover:opacity-75 ">
                                        <img
                                            alt={images.length>1?images[1]:'Product 2'}
                                            src={images?images[1]:''}
                                            decoding="async"
                                            loading="lazy"
                                            class="h-20 w-20 object-cover md:h-24 md:w-24 lg:h-28 lg:w-28 xl:w-32"
                                            onClick={() => {
                                                setNumber(1)
                                            }}
                                        />
                                    </div>
                                    <div class="border-border-base flex cursor-pointer items-center justify-center overflow-hidden rounded border transition hover:opacity-75 ">
                                        <img
                                            alt={images.length>2?images[2]:'Product 3'}
                                            src={images?images[2]:''}
                                            decoding="async"
                                            loading="lazy"
                                            class="h-20 w-20 object-cover md:h-24 md:w-24 lg:h-28 lg:w-28 xl:w-32"
                                            onClick={() => {
                                                setNumber(2)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        <section className="py-10">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="mx-auto w-full text-center md:max-w-2xl">
                                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl mb-12">
                                        Give Feedback!
                                    </h2>
                                    <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600">
                                        If you encounter any Issue please contact us , using contact us section and share your feedback to us . We are continuesly improving our website to serve to users for free
                                    </p>
                                </div>

                                <div className="mt-8 flex items-center justify-center px-8 sm:px-0">
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
                                        className="h-4 w-4 text-gray-600"
                                    >
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                    <span className="ml-2 text-sm text-gray-600">
                                        Your data is complely secured with us. We don&#x27;t share with anyone.
                                    </span>
                                </div>
                            </div>
                        </section>



                    </div>
                </div>
            </div>
        </div>

    )
}

export default FoodForm
