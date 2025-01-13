import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; import 'react-toastify/dist/ReactToastify.css';

const notify = (message: string) => toast(message);

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
        <ToastContainer />
        <h1>Order List</h1>
        <ul>
            {orders.map((order: any) => (
            <li key={order.id}>
                <Link to={`/orders/${order.id}`}>{order.id}</Link>
            </li>
            ))}
        </ul>
        <Link to="/create-order">Create Order</Link>
    </div>
  );
}

export default OrderList;
