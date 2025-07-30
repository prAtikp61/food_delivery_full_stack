import React from 'react'
import { Button, FormControlLabel, Select, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field ,Form,Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { registerUser } from '../State/Authentication/Action';
import { useDispatch } from 'react-redux';

const initialValues={
    name:"",
    email:"",
    password:"",
    role:""
}



const RegisterForm = () => {
     const navigate=useNavigate()
     const dispatch=useDispatch()
const handleSubmit=(values)=>{
    console.log("values Are",values)
         dispatch(registerUser({userData:values,navigate}))
}
  return (
    <div>
        <Typography variant='h5 'className='text-center'>
        Register
        </Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
                    <Field as={TextField}
                          name="name"
                           label="name"
                            fullWidth variant="outlined" margin="normal">
                            </Field>
                 <Field as={TextField}
                          name="email"
                           label="email"
                            fullWidth variant="outlined" margin="normal">
                            </Field>
                               <Field as={TextField}
                          name="password"
                           label="password"
                           type="password"
                            fullWidth variant="outlined" margin="normal">
                            </Field>
                             

                            <FormControl  margin="normal" fullWidth>
                                <InputLabel id="role-simple-select-label">Role</InputLabel>
                                 <Field
                                 as={Select}
                                    labelId="role-simple-select-label"
                                    id="role-simple-select"
                                    label="Role"
                                    name="role"
                           
                                >
                                <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                                <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
                           
                                </Field>
                            </FormControl>
                   

                            <Button type='submit' variant='contained' fullWidth sx={{mt:2,padding:"1rem"}}>Register</Button>
            </Form>
        </Formik>
        <Typography variant='body2' align='center'sx={{mt:3}}> 
            Already have an account ?
            <Button size='small' onClick={()=>{navigate("/account/login")}}>Login</Button>
        </Typography>
    </div>
  )
}

export default RegisterForm