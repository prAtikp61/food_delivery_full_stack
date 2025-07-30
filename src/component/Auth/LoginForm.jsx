
import { Button, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field ,Form,Formik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../State/Authentication/Action';
const initialValues={
    email:"",
    Password:""
}



const LoginForm = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleSubmit=(value)=>{
        dispatch(loginUser({userData:value,navigate}))
    }

  return (
    <div>
        <Typography variant='h5 'className='text-center'>
            Login
        </Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
                 <Field as={TextField}
                          name="email"
                           label="email"
                            fullWidth variant="outlined" margin="normal">
                            </Field>
                               <Field as={TextField}
                          name="password"
                           label="password"
                            fullWidth variant="outlined" margin="normal">
                            </Field>
                   

                            <Button type='submit' variant='contained' fullWidth sx={{mt:2,padding:"1rem"}}>Login</Button>
            </Form>
        </Formik>
        <Typography variant='body2' align='center'sx={{mt:3}}> 
            Dont have an account
            <Button size='small' onClick={()=>{navigate("/account/register")}}>Register</Button>
        </Typography>
    </div>
  )
}

export default LoginForm