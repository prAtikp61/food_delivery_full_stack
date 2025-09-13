import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import CartItem from "./CartItem";
import AddressCart from "./AddressCart";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../State/Order/Action";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
  const { cart, auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpenAddressModel = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Corrected handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const form = e.currentTarget;
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          fullName: auth.user.fullName,
          streetAddress: form.streetAddress.value,
          city: form.city.value,
          state: form.state.value,
          postalCode: form.pincode.value,
          country: "USA", // Or make this dynamic if needed
        },
      },
    };
    dispatch(createOrder(data));
    console.log("Order data submitted:", data);
    handleClose(); // Close modal after submission
  };

  // This function can be used for pre-saved addresses
  const handleSelectAddress = (deliveryAddress) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: deliveryAddress
      },
    };
    dispatch(createOrder(data));
    console.log("Order created with selected address", data)
  };

  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cart.cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>₹{cart.cart?.total}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Delivery Fee</p>
                <p>₹21</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>GST and Restaurant Charges</p>
                <p>₹33</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Total pay</p>
              <p>₹{cart.cart?.total + 33 + 21}</p>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {/* This part should map over actual addresses when available */}
              {[1, 1, 1].map((item, index) => (
                <AddressCart
                  key={index}
                  item={item}
                  showButton={true}
                  handleSelectAddress={() => handleSelectAddress(item)} // Pass address data here
                />
              ))}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocationAltIcon />
                <div className="space-y-3 text-gray-500">
                  <h1 className="font-semibold text-lg text-white">
                    Add New Address
                  </h1>
                  <Button onClick={handleOpenAddressModel} variant="outlined" fullWidth>
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {/* Form now has an onSubmit handler */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Street Address" fullWidth variant="outlined" name="streetAddress" required />
              </Grid>
              <Grid item xs={12}>
                <TextField label="City" fullWidth variant="outlined" name="city" required />
              </Grid>
              <Grid item xs={12}>
                <TextField label="State" fullWidth variant="outlined" name="state" required />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Pincode" fullWidth variant="outlined" name="pincode" type="number" required />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="contained" type="submit">
                  Deliver Here
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;