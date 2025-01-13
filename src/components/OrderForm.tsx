import React from 'react';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Grid, IconButton } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderForm: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      orderID: '',
      customerID: '',
      orderItems: [
        {
          productID: '',
          quantity: 1,
          price: 0,
        },
      ],
    },
    validationSchema: Yup.object({
      orderID: Yup.string().required('Order ID is required'),
      customerID: Yup.number().required('Customer ID is required'),
      orderItems: Yup.array().of(
        Yup.object().shape({
          productID: Yup.number().required('Product ID is required'),
          quantity: Yup.number().required('Quantity is required').min(1, 'Minimum quantity is 1'),
          price: Yup.number().required('Price is required').min(0, 'Minimum price is 0'),
        })
      ),
    }),
    onSubmit: (values) => {
      axios.post('/orders', values)
        .then(response => {
          toast.success('Order created successfully');
          navigate(`/orders/${response.data.order_id}`);
        })
        .catch(error => toast.error('Failed to create order'));
    },
  });

  return (
    <Container>
      <ToastContainer />
      <Typography variant="h4" gutterBottom>Create Order</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="orderID"
          name="orderID"
          label="Order ID"
          value={formik.values.orderID}
          onChange={formik.handleChange}
          error={formik.touched.orderID && Boolean(formik.errors.orderID)}
          helperText={formik.touched.orderID && formik.errors.orderID}
          margin="normal"
        />
        <TextField
          fullWidth
          id="customerID"
          name="customerID"
          label="Customer ID"
          value={formik.values.customerID}
          onChange={formik.handleChange}
          error={formik.touched.customerID && Boolean(formik.errors.customerID)}
          helperText={formik.touched.customerID && formik.errors.customerID}
          margin="normal"
        />
        <FormikProvider value={formik}>
          <FieldArray name="orderItems">
            {({ push, remove }) => (
              <div>
                {formik.values.orderItems.map((item, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        id={`orderItems.${index}.productID`}
                        name={`orderItems.${index}.productID`}
                        label="Product ID"
                        value={item.productID}
                        onChange={formik.handleChange}
                        error={formik.touched.orderItems?.[index]?.productID && Boolean(formik.errors.orderItems?.[index]?.productID)}
                        helperText={formik.touched.orderItems?.[index]?.productID && formik.errors.orderItems?.[index]?.productID}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        id={`orderItems.${index}.quantity`}
                        name={`orderItems.${index}.quantity`}
                        label="Quantity"
                        type="number"
                        value={item.quantity}
                        onChange={formik.handleChange}
                        error={formik.touched.orderItems?.[index]?.quantity && Boolean(formik.errors.orderItems?.[index]?.quantity)}
                        helperText={formik.touched.orderItems?.[index]?.quantity && formik.errors.orderItems?.[index]?.quantity}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        id={`orderItems.${index}.price`}
                        name={`orderItems.${index}.price`}
                        label="Price"
                        type="number"
                        value={item.price}
                        onChange={formik.handleChange}
                        error={formik.touched.orderItems?.[index]?.price && Boolean(formik.errors.orderItems?.[index]?.price)}
                        helperText={formik.touched.orderItems?.[index]?.price && formik.errors.orderItems?.[index]?.price}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton onClick={() => remove(index)}>
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={() => push({ productID: '', quantity: 1, price: 0 })}
                >
                  <AddIcon /> Add Item
                </Button>
              </div>
            )}
          </FieldArray>
        </FormikProvider>
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '16px' }}>
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default OrderForm;
