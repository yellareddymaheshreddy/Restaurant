import React, { useRef, useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
// import Email from './Email'
// import { notifyfail, notifysuccess } from './toast'
// import conf from '../conf/conf'

function Signup() {
    const form= useRef();
    // const sendEmail = () => {
    //     // e.preventDefault();
    //     let details = [];
    //     form.current.querySelectorAll("input").forEach(input => {
    //         details.push(input.value)
    //     });

    //     Email.send({
    //         SecureToken: conf.SecureToken,
    //         To: conf.maheshmail,
    //         From: conf.maheshmail,
    //         Subject: `Teleport : ${details[0]} Newly signed up!`,
    //         Body: `<body style="margin: 0;padding: 0;">
    //         <div
    //             style="background-color: black; background-color: black;color: white; display: flex;
    //             flex-direction:column; align-items: center; justify-content: center; padding-block: 2rem; overflow-x: hidden;overflow-y: hidden; overflow: hidden;max-width: 100vw; ">
    //             <div style="min-width: 100vw;">
    //                 <p style="font-size: 2.25rem; line-height: 2.5rem;font-weight: 700;margin: 4vw;">
    //                     Hello <span style="color: purple;">Mahesh Reddy</span>,
    //                 </p>
    //                 <p style=" color: azure; margin: 4vw;">
    //                     New user signuped!!!! <a href="https://maheshreddy.online/"
    //                         style=" color:aqua;;">Teleport</a> :
    //                 </p>
    //                 <hr style="margin: 4vw;">

    //                 <div style="margin: 8vw">
    //                     <div style=" display: grid; width: 270px; row-gap: 1rem">
    //                         <div>
    //                             <label style="font-size: 0.875rem; font-weight: 500;  color:gray;line-height: 24px;">
    //                                 First Name
    //                             </label>
    //                             <div
    //                                 style=" borderRadius: 0.375rem; border: 1px solid aliceblue;  padding: 0.5rem 0.75rem; font-family: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif; font-size: 0.875rem; line-height: 1.25rem">
    //                                 ${details[0]}
    //                             </div>
    //                         </div>
                            
    //                         <div>
    //                             <label style="font-size: 0.875rem; font-weight: 500;  color:gray;line-height: 24px;">
    //                                 Email
    //                             </label>
    //                             <div
    //                                 style=" borderRadius: 0.375rem; border: 1px solid aliceblue;  padding: 0.5rem 0.75rem; font-family: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif; font-size: 0.875rem; line-height: 1.25rem">
    //                                 ${details[1]}
    //                             </div>
    //                         </div>
    //                         <div>
    //                             <label style="font-size: 0.875rem; font-weight: 500;  color:gray;line-height: 24px;">
    //                                 Password
    //                             </label>
    //                             <div
    //                                 style=" borderRadius: 0.375rem; border: 1px solid aliceblue;  padding: 0.5rem 0.75rem; font-family: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif; font-size: 0.875rem; line-height: 1.25rem">
    //                                 ${details[2]}
    //                             </div>
    //                         </div>
                            
    //                     <button 
    //                         style="background-color: purple;border: none; borderRadius: 4px; padding: 8px; color: white; font-weight: 600;margin-top: 24px;"
    //                         >
    //                         <a href="https://maheshreddy.online/"
    //                             style=" color: inherit; text-decoration: inherit;">Visit
    //                             Website</a> </button>
    //                     </form>
    //                 </div>
    //             </div>
    //     </body>`
    //     }).then(
    //         message => {
    //             console.log("login sucess")
                
    //         }

    //     ).catch(
    //         message => {
    //             console.log("login failed")
    //         }
    //     );
    // }

    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                // notifysuccess("signup succesfull!")
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login({userData}));
                navigate("/")
                // sendEmail()
            }
        } catch (error) {
            // notifyfail("failed to signup")
            setError(error.message)
        }
    }

    return (
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <div className="mb-2 flex justify-center">
                        {/* <img src="/favicon.svg" alt="Teleport" height={56} width={56} /> */} logo
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Sign up to create account
                    </h2>
                    <p className="mt-2 text-center text-base text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            title=""
                            className="font-medium text-black transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                    {error && <p className='text-red-500 text-center capitalize font-medium'> {error}</p>}

                    <form onSubmit={handleSubmit(create)}
                     method="POST" className="mt-8" ref={form}>
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="name" className="text-base font-medium text-gray-900">
                                    {" "}
                                    Full Name{" "}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Full Name"
                                        {...register("name", { required: true })}
                                        id="name"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="text-base font-medium text-gray-900">
                                    {" "}
                                    Email address{" "}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                        {...register("email", {
                                            required: true,
                                            validate: {
                                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                    "Email address must be a valid address",
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-base font-medium text-gray-900">
                                        {" "}
                                        Password{" "}
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Password"
                                        id="password"
                                        {...register("password", { required: true })}
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                >
                                    Create Account{" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="ml-2"
                                    >
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>
                    
                </div>
            </div>
        </section>

    )
}

export default Signup