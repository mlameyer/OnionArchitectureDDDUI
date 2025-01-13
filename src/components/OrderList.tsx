import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/orders')
      .then(response => setOrders(response.data))
      .catch(error => toast.error('Failed to fetch orders'));
  }, []);

  return (
    <Container>
      <ToastContainer />
      <Typography variant="h4" gutterBottom>Order List</Typography>
      <List>
        {orders.map((order: any) => (
          <ListItem key={order.id} button component={Link} to={`/orders/${order.id}`}>
            <ListItemText primary={`Order ID: ${order.id}`} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" component={Link} to="/create-order">
        Create Order
      </Button>
    </Container>
  );
}

export default OrderList;
