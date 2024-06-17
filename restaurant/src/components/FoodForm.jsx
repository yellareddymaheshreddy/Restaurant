import React from 'react'
import { useForm } from 'react-hook-form'
import appwriteservice from '../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ID } from 'appwrite'
// import { notifyfail, notifysuccess } from './toast'
import { addfood,updatefood } from '../store/foodItemsSlice'

const PostForm = ({ ride }) => {
    const date = new Date().getFullYear() + "-0" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
    const listofvechicles = ["Bike", "Car", "Auto", "Bus", "Lorry", "Ship", "Airplane", "Helicopter", "Scooter", "Tuk-tuk"];
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.userData)
    const { register, handleSubmit } = useForm({
        defaultValues: {
            From: ride?.From || '',
            To: ride?.To || '',
            Vechicle: ride?.Vechicle || '',
            NumberofPassengers: ride?.NumberofPassengers || '',
            DateofRide: ride?.DateofRide || '',
            Message: ride?.Message || '',
            Rideid: ride?.Rideid || "",
            Rideremail: ride?.Rideremail || userData.email || '',
            Riderphone: ride?.Riderphone || userData.phone || '+91',
            Ridername: ride?.Ridername || userData.name || '',

        }
    });
    const navigate = useNavigate();
    const submit = async (data) => {
        if (ride) {
            dispatch(updatefood({ id: ride.Rideid, data }))
            const dbride = await appwriteservice.updatePost(ride.Rideid, { ...data })
            if (dbride) {
                navigate(`/ride/${ride.Rideid}`)
            }
            // notifysuccess("Ride Updated Successfully!")

        }
        else {
            const uniqueid = ID.unique();
            dispatch(addfood({ ...data, NumberofPassengers: Number(data.NumberofPassengers), Createdby: userData.$id, Rideid: uniqueid }))
            navigate(`/ride/${uniqueid}`)
            const dbride = await appwriteservice.createPost({
                ...data,
                NumberofPassengers: Number(data.NumberofPassengers),
                Createdby: userData.$id,
                Rideid: uniqueid,
            })
            if (dbride) {
                notifysuccess("Ride Created Successfully!")
            } else {
                notifyfail("something went wrong when createing file on server")
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
                                                    Ride information
                                                </h3>
                                                <div className="mt-4 w-full">
                                                    <label
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        htmlFor="name"
                                                    >
                                                        From :
                                                    </label>
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="text"
                                                        placeholder="Hyderabad...."
                                                        id="name"
                                                        {...register("From", { required: true })}
                                                    />
                                                </div>
                                                <div className="mt-4 w-full">
                                                    <label
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        htmlFor="name"
                                                    >
                                                        TO :
                                                    </label>
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="text"
                                                        placeholder="Banglore....."
                                                        id="name"
                                                        {...register("To", { required: true })}

                                                    />
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="mt-5">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Vechicle details
                                                </h3>
                                                <div className="mt-2 grid  gap-x-4 gap-y-4 sm:grid-cols-4">

                                                    <div className="col-span-2 ">
                                                        <label
                                                            htmlFor="expiration-date"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Ride Date (MM/YY)
                                                        </label>
                                                        <div className="mt-1">
                                                            <input

                                                                min={date}
                                                                type="date"
                                                                name="expiration-date"
                                                                placeholder='12-05-2024'
                                                                id="expiration-date"
                                                                autoComplete="cc-exp"
                                                                className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                {...register("DateofRide", { required: true })}
                                                            // min={new Date().getDate()+ "-" +  parseInt(new Date().getMonth() + 1 ) + "-" + new Date().getFullYear()}

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='w-max'>
                                                        <label
                                                            htmlFor="cvc"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            No.of Passengers:
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
                                                                {...register("NumberofPassengers", { required: true })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="mt-5">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Vechicle Details
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
                                                                placeholder='Its a free ride ....'
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
                                                            Vechicle Type:
                                                        </label>
                                                        <div className="mt-1">
                                                            <select defaultValue={"Bike"} name="vechicle" id="vechicle" className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                {...register("Vechicle", { required: true })}
                                                                placeholder="Car"
                                                            >

                                                                {listofvechicles.map((Vechicle) => <option key={Vechicle} value={Vechicle}>{Vechicle}</option>
                                                                )}
                                                            </select>

                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="mt-5">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Rider Contact Details!
                                                </h3>
                                                <div className="sm:col-span-3">
                                                        <label
                                                            htmlFor="address"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Rider Name:
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="address"
                                                                name="address"
                                                                autoComplete="phone"
                                                                placeholder='Phone Number'
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
                                                                {...register("Riderphone", { required: true })}

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
                                                    {ride ? "Update" : "Submit"}
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

export default PostForm
