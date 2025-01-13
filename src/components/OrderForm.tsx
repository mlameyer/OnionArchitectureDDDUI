import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderForm: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      /* your form fields */
    },
    validationSchema: Yup.object({
      /* validation schema */
    }),
    onSubmit: (values) => {
      axios.post('/orders', values)
        .then(response => navigate(`/orders/${response.data.id}`))
        .catch(error => console.error(error));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Create Order</h1>
      {/* Form fields with validation */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default OrderForm;
