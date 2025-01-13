import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    axios.get(`/orders/${id}`)
      .then(response => setOrder(response.data))
      .catch(error => toast.error('Failed to fetch order details'));
  }, [id]);

  if (!order) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <ToastContainer />
      <Typography variant="h4" gutterBottom>Order Detail</Typography>
      <Paper style={{ padding: '16px' }}>
        <Typography>Order ID: {order.order_id}</Typography>
        <Typography>Customer ID: {order.customer_id}</Typography>
        <Typography>Total Amount: {order.total_amount}</Typography>
        <Typography>Items:</Typography>
        <ul>
          {order.items.map((item: any) => (
            <li key={item.product_id}>
              <Typography>Product ID: {item.product_id}</Typography>
              <Typography>Quantity: {item.quantity}</Typography>
              <Typography>Price: {item.price}</Typography>
            </li>
          ))}
        </ul>
      </Paper>
    </Container>
  );
}

export default OrderDetail;
