import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import conf from '../conf/conf'
import { Link } from 'react-router-dom'
import { Query } from 'appwrite'

const AllOrders = () => {
  const [o, seto] = useState([])
  const [string, setString] = useState('')
  useEffect(() => {
    // const dateInIST = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' });
    // const [day, month, year] = dateInIST.split(', ')[0].split('/');
    // const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const formattedDate = new Date().toISOString().split('T')[0];
    service.getAllOrders([Query.startsWith("$createdAt", formattedDate)]).then((allorders) => {
      console.log(allorders.documents)
      seto(allorders.documents)
    })
  }, [])


  useEffect(() => {
    const unsubscribe = service.client.subscribe(`databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionIdOrders}.documents`, response => {
      console.log(response)
      if (response.events.includes("databases.*.collections.*.documents.*.create")) {
        console.log('event occured')
        setString('')
        JSON.parse(response.payload.Items[0]).map(item => {
          console.log(item)
          setString(prev => prev + `${item.Quantity} ${item.Name} `)
        })

        seto((prev) => [...prev, response.payload])
      }
    });

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    console.log('new order ', string)
    if(string.length>1){
      const message = new SpeechSynthesisUtterance();
    message.text = `New order ${string}`;
    const speechSynthesis = window.speechSynthesis;
    speechSynthesis.speak(message);
    }
    
    // return()=>{
    //   // speechSynthesis.pause();
    // }
  }, [string])


  return (
    <div className='allk'>
      <section class="mx-auto w-full max-w-7xl px-4 py-4">
        <div class="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 class="text-lg font-semibold">All Orders (<span className='font-bold'>Today</span>)</h2>
            <p class="mt-1 text-sm text-gray-700">
              This is a list of all Orders.
            </p>
          </div>

        </div>
        <div class="mt-6 flex flex-col">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden border border-gray-200 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr class="divide-x divide-gray-200">
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        <span>Items</span>
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Mobile Number
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Message
                      </th>
                      <th scope="col" class="relative px-4 py-3.5">
                        <span class="">Total</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    {o?.map((item) => (<Row key={item.$createdAt} data={item} />))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 w-full border-gray-300">
          <div class="mt-2 flex items-center justify-end">
            <div class="space-x-2">
              <button
                type="button"
                class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                ← Previous
              </button>
              <button
                type="button"
                class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>

  )
}

export default AllOrders


function Row({ data }) {
  return (
    <tr class="divide-x divide-gray-200">
      <td class="whitespace-nowrap px-4 py-4">
        <div class="flex items-center">
          <div class="h-10 w-10 flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1160&amp;q=80"
              alt=""
            />
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900 text-wrap">
              {data ? JSON.parse(data?.Items[0]).map((Item) => (
                <div key={Item.Name}>{Item.Name}({Item.Quantity})</div>
              )) : ''}
            </div>
            {/* <div class="text-sm text-gray-500">john@devui.com</div> */}
          </div>
        </div>
      </td>
      {/* <td class="whitespace-nowrap px-12 py-4">
                        <div class="text-sm text-gray-900">{data?JSON.parse(data?.Items[0]).map((Item)=>(
                                <div key={Item.Name}> {Item.Quantity}</div>
                              )):''}</div>
                        <div class="text-sm text-gray-500">Engineering</div> 
                      </td> */}
      <td class="whitespace-nowrap px-4 py-4">
        <Link to={`tel:${data?.MobileNumber}`}>
          <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
            {data?.MobileNumber}
          </span>
        </Link>
      </td>
      <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
        <div className='flex justify-between'>
          <span>{data?.Address}</span>
          {data?.Location ? <button
            className='bg-yellow-200 rounded-full px-2 border border-yellow-500 font-black shadow-xl ml-4'
            onClick={() => {
              window.open(`https://www.google.com/maps/dir/?api=1&destination=${data?.Location}`)
            }}>
            Maps
          </button> : ''}
        </div>


      </td>
      <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500 text-wrap">
        {data?.Message}
      </td>
      <td class="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
        <a href="#" class="text-gray-700 hover:text-indigo-600">
          ₹{data?.GrandTotal}
        </a>
      </td>
    </tr>
  )
}