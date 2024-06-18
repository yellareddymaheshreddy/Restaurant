import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import appwriteservice from '../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ID } from 'appwrite'

const Checkout = () => {


    const userData = useSelector(state => state.auth.userData)
    const [Location, setLocation] = useState()
    const Items = useSelector(state => state.cartitems.cartitems)
    let totalOrderPrice = 0;
    let totalSalePrice = 0;
    Items.forEach(item => {
        totalOrderPrice += item.OrderPrice * item.Quantity;
        totalSalePrice += item.SalePrice * item.Quantity;
    });
    const listofVillages = ['Mangalpally', 'Sheriguda', 'CVR'];
    const { register, handleSubmit } = useForm({
        defaultValues: {
            Landmark: 'hh',
            Village: 'Mangalpally',
            GrandTotal: '',
            Message: 'h',
            Rideremail: userData.email || '',
            MobileNumber: userData.phone || '+91',
            Ridername: userData.name || '',
            Location: Location,

        }
    });
    const navigate = useNavigate();
    const submit = async (data) => {

        const uniqueid = ID.unique();
        // dispatch(create({ ...data, GrandTotal: Number(data.GrandTotal), Createdby: userData.$id, Rideid: uniqueid }))
        // navigate(`/ride/${uniqueid}`)
        const dbride = await appwriteservice.createOrder({
            ...data,
            GrandTotal: Number(totalSalePrice),
            Orderby: userData.$id,
            Address: [data.Village, data.Landmark],
            Items: [JSON.stringify(Items)]
        })
        if (dbride) {
            // notifysuccess("Ride Created Successfully!")
            console.log('order successfull')
            // navigate('/')
        } else {
            // notifyfail("something went wrong when createing file on server")
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
                                                    Delivery information
                                                </h3>
                                                <div className="mt-4 w-full">
                                                    <label
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        htmlFor="name"
                                                    >
                                                        Landmark :
                                                    </label>
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="text"
                                                        placeholder="Ganesh hostel...."
                                                        id="name"
                                                        {...register("Landmark", { required: true })}
                                                    />
                                                </div>

                                            </div>
                                            <hr className="my-4" />
                                            <div className="mt-5">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Price details
                                                </h3>
                                                <div className="mt-2 grid  gap-x-4 gap-y-4 sm:grid-cols-4">


                                                    <div className='w-max'>
                                                        <label
                                                            htmlFor="cvc"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            GrandTotal:
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                min={1}
                                                                placeholder='1'
                                                                type="number"
                                                                name="cvc"
                                                                id="cvc"
                                                                autoComplete="csc"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                // {...register("GrandTotal", { required: true })}
                                                                value={totalSalePrice}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="mt-5">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Location Details
                                                </h3>
                                                <div className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-3">
                                                    <div className="sm:col-span-3">
                                                        <label
                                                            htmlFor="address"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Message
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="address"
                                                                name="address"
                                                                autoComplete="message"
                                                                placeholder='Near JMJ hostel'
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                {...register("Message", { required: true })}

                                                            />

                                                        </div>
                                                    </div>
                                                    <div className='w-max'>
                                                        <label
                                                            htmlFor="cvc"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Village :
                                                        </label>
                                                        <div className="mt-1">
                                                            <select name="Village" id="Village" className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                {...register("Village", { required: true })}
                                                                placeholder=""
                                                            >

                                                                {listofVillages.map((Village) => <option key={Village} value={Village}>{Village}</option>
                                                                )}
                                                            </select>

                                                        </div>
                                                    </div>
                                                    <div className='w-max'
                                                        onClick={() => {
                                                            navigator.geolocation.getCurrentPosition((position) => {
                                                                console.log(position.coords.latitude, position.coords.longitude);
                                                                setLocation(`${position.coords.latitude},${position.coords.longitude}`)
                                                            });
                                                        }}>
                                                        <label
                                                            htmlFor="cvc"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Location:
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                min={1}
                                                                placeholder='Give location permission'
                                                                type="text"
                                                                name="cvc"
                                                                id="cvc"

                                                                autoComplete="csc"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                {...register("Location", { required: true })}
                                                                value={Location}
                                                            />
                                                        </div>
                                                    </div>



                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="mt-5">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Contact Details!
                                                </h3>
                                                <div className="sm:col-span-3">
                                                    <label
                                                        htmlFor="address"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Name:
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="text"
                                                            id="address"
                                                            name="address"
                                                            autoComplete="phone"
                                                            placeholder='Name'
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            {...register("Ridername", { required: true })}

                                                        />

                                                    </div>
                                                </div>
                                                <div className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-3">

                                                    <div className="sm:col-span-3">
                                                        <label
                                                            htmlFor="address"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Phone Number:
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="address"
                                                                name="address"
                                                                autoComplete="phone"
                                                                placeholder='Phone Number'
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                {...register("MobileNumber", { required: true })}

                                                            />

                                                        </div>
                                                    </div>
                                                    <div className='sm: col-span-3'>
                                                        <label
                                                            htmlFor="address"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Email id:
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="address"
                                                                name="address"
                                                                autoComplete="email-id"
                                                                placeholder='Email id'
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                {...register("Rideremail", { required: true })}

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
                                                    {"Submit"}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 px-5 py-6 md:px-8">
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

export default Checkout
