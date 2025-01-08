import { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import React from 'react'
import { ShopContext } from '../context/ShopContext';

const UserOrders = () => {
  const { backendUrl } = useContext(ShopContext);

  const [userOrders, setUserOrders] = useState([]);

  const fetchUserOrders = async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/order/userorders",
        { withCredentials: true })
      if (data.success) setUserOrders(data.orders)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchUserOrders();
  }, [])
  console.log(userOrders);


  if (!userOrders) return <p>Your orders will appear here.</p>

  return (
    <div>
      {userOrders.map((order, idx) => (
        <div key={idx} style={{margin: "20px"}}>
          <p></p>
        </div>
      ))}
    </div>
  )
}

export default UserOrders