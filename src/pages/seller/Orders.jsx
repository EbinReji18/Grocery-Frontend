import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets, dummyOrders } from '../../assets/assets'

const Orders = () => {

  const { currency } = useAppContext()
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    setOrders(dummyOrders)
  };

  useEffect(() => {
    fetchOrders();
  }, [])

  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orders.map((order, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300">

            {/* Item list */}
            <div className="flex gap-5 max-w-80">
              <img className="w-12 h-12 object-cover" src={assets.box_icon} alt="boxIcon" />
              <div>
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <p className="font-medium">
                      {item.product.name}{" "}
                      <span className="text-primary">x {item.quantity}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery + Amount + Payment info */}
            <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between w-full">

              <div className="text-sm md:text-base text-black/60 min-w-[200px] text-left">
                <p className="text-black/80">{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.street}, {order.address.city}</p>
                <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
                <p>{order.address.phone}</p>
              </div>

              <p className="font-medium text-lg text-black my-auto min-w-[120px]">{currency}{order.amount}</p>

              <div className="flex flex-col text-sm min-w-[160px] text-left">
                <p>Method: {order.paymentType}</p>
                <p>Date: {new Date(order.createAt).toLocaleDateString()}</p>
                <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
