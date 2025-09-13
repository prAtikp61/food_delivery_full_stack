import { Divider, Grid, Modal, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import AddressCart from './AddressCart';
import AddLocationAlt from '@mui/icons-material/AddLocationAlt';
import { Button, Card } from '@mui/material';
import Box from '@mui/material/Box';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { findcart } from '../State/Cart/Action';
import { createOrder } from '../State/Order/Action';

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: 'none',
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  streetAddress: '',
  state: '',
  pincode: '',
  city: '',
};

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');

  const { cart: cartState } = useSelector((store) => store);
  const { isLoading } = useSelector((store) => store.order || {});
  const cartItems = cartState.cart?.cartItems || [];

  // Fetch cart on mount
  useEffect(() => {
    dispatch(findcart(jwt));
  }, [dispatch, jwt]);

  // Calculate total dynamically
  const itemTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleOpenAddressModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (values) => {
    if (!cartItems.length) {
      alert('Your cart is empty. Add items before placing an order.');
      return;
    }

    const restaurantId = cartItems[0].food.restaurant?.id;
    if (!restaurantId) {
      alert('Cannot create order: invalid restaurant.');
      return;
    }

    const deliveryAddress = selectedAddress || {
      streetName: values.streetAddress,
      city: values.city,
      state: values.state,
      zipCode: values.pincode,
      country: 'IN',
    };

    const data = {
      jwt,
      order: {
        restaurantId,
        deliveryAdd: deliveryAddress,
      },
    };

    dispatch(createOrder(data)).then(() => {
      alert('Order created successfully!');
      dispatch(findcart(jwt)); // Refresh cart after order
    });

    handleClose();
  };

  return (
    <>
      <main className="lg:flex justify-between">
        {/* Cart Items Section */}
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cartItems.map((cartItem, index) => (
            <CartItem key={index} item={cartItem} />
          ))}

          <Divider />
          <div className="px-5 billDetails text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>Rs.{itemTotal}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Delivery Fees</p>
                <p>Rs.20</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>GST & Restaurant Charges</p>
                <p>Rs.30</p>
              </div>
            </div>
            <Divider />
            <div className="flex justify-between mt-4 text-gray-400">
              <p>Total Pay</p>
              <p>Rs.{itemTotal + 50}</p>
            </div>
          </div>
        </section>

        <Divider orientation="vertical" flexItem />

        {/* Address Section */}
        <section className="lg:w-[70%] flex justify-center pb-10 px-5 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold py-10 text-2xl">
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
            

              <Card className="flex gap-5 w-64 p-5">
                <AddLocationAlt />
                <div className="space-y-3 text-gray-500">
                  <h1 className="font-semibold text-lg text-white">Add New Address</h1>
                  <Button variant="outlined" fullWidth onClick={handleOpenAddressModal}>
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Modal Formik */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="streetAddress"
                      label="Street Address"
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field as={TextField} name="state" label="State" fullWidth variant="outlined" />
                  </Grid>
                  <Grid item xs={12}>
                    <Field as={TextField} name="city" label="City" fullWidth variant="outlined" />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="pincode"
                      label="Pincode"
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      color="primary"
                      disabled={isLoading || (!values.streetAddress && !values.city && !values.state && !values.pincode)}
                    >
                      {isLoading ? 'Placing Order...' : 'Deliver Here'}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
