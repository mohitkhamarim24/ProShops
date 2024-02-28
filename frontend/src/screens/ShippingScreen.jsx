import React from 'react'
import { useState } from 'react';
import {Form ,Button} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { saveShippingAdddress } from '../slices/cartSlices';
import CheckoutSteps from '../components/CheckoutSteps';





const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const {shippingAdddress} =cart;
    const[address,setAddress] =useState(shippingAdddress?.address || '');
    const[city,setCity] =useState(shippingAdddress?.city || '');
    const[country,setCountry] =useState(shippingAdddress?.country || '');
    const[postalCode,setPostalCode] =useState(shippingAdddress?.postalCode || '');

    const navigate = useNavigate();
    const dispatch = useDispatch();
 

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAdddress({address,city,postalCode,country}));
        navigate('/payment');
    };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
               <h1>Shipping</h1>
               <Form onSubmit={submitHandler}>
               <Form.Group controlId='address' className='my-2'>
                <Form.Label>Address</Form.Label>
                <Form.Control 
                type='text'
                placeholder='Enter Address'
                value={address}
                onChange={(e)=> setAddress(e.target.value)}
                ></Form.Control>
               </Form.Group>

               <Form.Group controlId='city' className='my-2'>
                <Form.Label>City</Form.Label>
                <Form.Control 
                type='text'
                placeholder='Enter City'
                value={city}
                onChange={(e)=> setCity(e.target.value)}
                ></Form.Control>
               </Form.Group>

               <Form.Group controlId='postalCode' className='my-2'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control 
                type='text'
                placeholder='Enter Postal Code'
                value={postalCode}
                onChange={(e)=> setPostalCode(e.target.value)}
                ></Form.Control>
               </Form.Group>

               
               <Form.Group controlId='country' className='my-2'>
                <Form.Label>Country</Form.Label>
                <Form.Control 
                type='text'
                placeholder='Enter Country'
                value={country}
                onChange={(e)=> setCountry(e.target.value)}
                ></Form.Control>
               </Form.Group>

               <Button type='submit' variant='primary' className='my-2'>Continue</Button>
               </Form>
    </FormContainer>
      );
}

export default ShippingScreen;