import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    axios.get(`/orders/${id}`)
      .then(response => setOrder(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Order Detail</h1>
      <pre>{JSON.stringify(order, null, 2)}</pre>
    </div>
  );
}

export default OrderDetail;
