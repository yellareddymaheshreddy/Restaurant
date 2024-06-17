import React from 'react'
import { RideCard } from './'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Allrides = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.auth.userData.$id);
  let rides = useSelector(state => state.rides.rides)
  const currentDate = new Date().getFullYear() + "-0" + (new Date().getMonth() + 1) + "-" + new Date().getDate();

  if (rides.length==0) {
    return (
      <section className='min-h-[40vh] flex justify-center items-center'>
        <div className="mx-4 my-8 p-2 md:px-4 md:py-8 text-center bg-slate-100 md:m-10 rounded-md ">
          <h2 className="text-2xl font-bold tracking-tight text-gray-800 xl:text-4xl">
            Sorry ! NO available Rides Right Now....!
          </h2>
          <p className="mt-4 block max-w-4xl text-gray-500">
            We are searching  to a rides to donate ride and spread our website to all ride doners
          </p>
          <div className="mt-6">
            <Link
              to={"/"}
              className="inline-flex  items-center justify-center overflow-hidden rounded-lg bg-gray-900 px-4 py-2.5 text-sm text-white shadow transition-colors duration-300 hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80 sm:mx-2 sm:w-auto"
            >

              <span className="mx-2">Home</span>
            </Link>
            <Link
              to={"/add-ride"}
              className="mt-4 inline-flex  items-center justify-center overflow-hidden rounded-lg bg-blue-600 px-4 py-2.5 text-sm text-white shadow transition-colors duration-300 hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80 sm:mx-2 sm:mt-0 sm:w-auto"
            >

              <span className="mx-2">Create Ride</span>
            </Link>
          </div>
        </div>
      </section>

    )
  }
  return (


    <section className="mx-auto  max-w-7xl px-4 py-4 min-h-[70vh]">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">All Rides</h2>
          <p className="mt-1 text-sm text-gray-700">
            This is a list of all Rides. You can add new Rides, edit or
            delete existing ones (owner only).
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              navigate('/add-ride')
            }}
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Create Ride
          </button>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className=" px-4 py-3.5 text-left font-medium text-gray-700"
                    >
                      <span>Ride Details</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-gray-700 border-x"
                    >
                      Date
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5  text-sm font-normal text-gray-700"
                    >
                      Vechicle
                    </th>
                    <th
                      scope="col"
                      className="px-16 py-3.5 text-left text-sm font-normal text-gray-700 border-x"
                    >
                      Message
                    </th>
                    <th scope="col" className="relative px-4 py-3.5 text-gray-500 text-sm">
                      <span >No.of Passengers</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white ">
                  {rides.map((ride) => {
                    if (ride.DateofRide >= currentDate || ride.Createdby == currentUser) {
                      return (
                        <tr key={ride.Rideid} className='w-full'>
                          <RideCard {...ride} />
                        </tr>
                      )
                    }
                  }
                  )}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


    </section>


  )


}

export default Allrides
