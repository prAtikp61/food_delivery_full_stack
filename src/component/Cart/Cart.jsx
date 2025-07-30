import { Divider, Grid, Modal, TextField } from '@mui/material'
import React from 'react'
import CartItem from './CartItem'
import AddressCart from './AddressCart'
import AddLocationAlt from '@mui/icons-material/AddLocationAlt';
import { Button, Card } from '@mui/material';
import Box from '@mui/material/Box';
import { ErrorMessage, Field ,Form,Formik } from 'formik';



 export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
 outline:"none",
  boxShadow: 24,
  p: 4,
};

const initialValues={
    streetAddress:"",
    state:"",
    pincode:"",
    city:""
}

// const validationSchema=
//     Yup.object.shape({
//         streetAddress:Yup.string().required("street address is required"),
//            pincode:Yup.required("pincode  is required"),
//               state:Yup.string().required("state  is required"),
//                  city:Yup.string().required("city  is required")
        
//         })


const handleSubmit=()=>{

}

const items=[1,1]
const Cart = () => {
      const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const createOrderUsingSelectedAddress=()=>{
    }
    const handleOpenAddressModel=()=>{setOpen(true)

    }
    const handleSubmit=(value)=>{
        console.log("form values are",value)
    }
  return (

  <>
    <main className='lg:flex justify-between'>
        <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
           {items.map((item)=> <CartItem/>)}
       
        <Divider/>
        <div className='px-5 billDetails text-sm'>
            <p className='font-extralight py-5'> Bill Details</p>
            <div className='space-y-3 mb-4'>
                <div className='flex justify-between text-gray-400'>
                    <p>Item Total</p>
                    <p>Rs.45473</p>
                </div>
                <div className='flex justify-between text-gray-400'>
                    <p>Delivery Fees</p>
                    <p>Rs.20</p>
                </div>
                <div className='flex justify-between text-gray-400'>
                    <p>GST & Restaurant Charges</p>
                    <p>Rs.30</p>
                </div>
            </div>
              <Divider/>
            <div className='flex justify-between mt-4 text-gray-400'>
                <p>Total Pay</p>
                <p>Rs.6467</p>
            </div>
        </div>
        </section>

        <Divider orientation='vertical' flexItem/>
        <section className='lg:w-[70%] flex justify-center pb-10 px-5 lg:pb-0'>
            <div>
                <h1 className='text-center font-semibold py-10 text-2xl'>
                    Choose Delivery Address
                </h1>
                <div className='flex gap-5 flex-wrap justify-center'>
                    {[1,1,1,1,1].map((item)=><AddressCart handleSelectAddress={createOrderUsingSelectedAddress}  item={item} showButton={true}/>)}
               
               <Card className='flex gap-5 w-64 p-5'>
                 <AddLocationAlt/>
                   <div className='space-y-3 text-gray-500'>
                       <h1 className='font-semibold text-lg text-white'>Add New Address </h1>
                  
                      <Button variant="outlined" fullWidth onClick={handleOpenAddressModel}>Add</Button>
                   </div>
                  </Card>

                </div>
            </div>
        </section>
       
    </main>
    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Formik initialValues={initialValues}
    //  validationSchema={validationSchema} 
     onSubmit={handleSubmit}>
     
<Form><Grid container spacing={3}>
    <Grid item xs={12}>
        <Field as={TextField}
         name="streetAddress"
          label="street address"
           fullWidth variant="outlined"
            // error={!ErrorMessage("streetAddress")}
            // helperText={
            //     <ErrorMessage>
            //         {(msg)=><span className='text-red-600'> {msg}</span>}
            //     </ErrorMessage>
            // }
            ></Field>
    </Grid>

    <Grid item xs={12}>
        <Field as={TextField}
         name="state"
          label="state"
           fullWidth variant="outlined"
            // error={!ErrorMessage("streetAddress")}
            // helperText={
            //     <ErrorMessage>
            //         {(msg)=><span className='text-red-600'> {msg}</span>}
            //     </ErrorMessage>
            // }
            ></Field>
    </Grid>

    <Grid item xs={12}>
        <Field as={TextField}
         name="city"
          label="city"
           fullWidth variant="outlined"
            // error={!ErrorMessage("streetAddress")}
            // helperText={
            //     <ErrorMessage>
            //         {(msg)=><span className='text-red-600'> {msg}</span>}
            //     </ErrorMessage>
            // }
            ></Field>
    </Grid>

    <Grid item xs={12}>
        <Field as={TextField}
         name="pincode"
          label="pincode"
           fullWidth variant="outlined"
            // error={!ErrorMessage("streetAddress")}
            // helperText={
            //     <ErrorMessage>
            //         {(msg)=><span className='text-red-600'> {msg}</span>}
            //     </ErrorMessage>
            // }
            ></Field>
    </Grid>

<Grid item xs={12}>
    <Button fullWidth variant='contained' type='submit' color="primary">
        Deliver Here
    </Button>
</Grid>


</Grid></Form>


    </Formik>
  </Box>
</Modal>
  </>
  )
}

export default Cart