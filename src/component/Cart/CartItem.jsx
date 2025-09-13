import { Chip, IconButton } from '@mui/material'
import React from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { updateCartItem, removeCartItem } from '../State/Cart/Action';


const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const handleUpdateCartItem = (num) => {
        // This is the new logic
        if (num === -1 && item.quantity === 1) {
            handleRemoveCartItem();
            return;
        }

        const data = {
          cartItemId: item.id,
          quantity: item.quantity + num,
          jwt: jwt
        };
        dispatch(updateCartItem(data));
      };

    const handleRemoveCartItem = () => {
        dispatch(removeCartItem({ cartItemId: item.id, jwt: jwt }));
    };

    return (
        <div className='px-5'>
            <div className='lg:flex items-center lg:space-x-5'>
                <div>
                    <img
                        className='w-[5rem] h-[5rem] object-cover'
                        src={item.food?.images?.[0] || "https://cdn.pixabay.com/photo/2022/02/12/21/22/toast-7009956_1280.jpg"}
                        alt={item.food?.name || "Food item"}
                    />
                </div>
                <div className='flex items-center justify-between lg:w-[70%]'>
                    <div className='space-y-1 lg:space-y-3 w-full'>
                        <p>{item.food?.name}</p>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center space-x-1'>
                                <IconButton onClick={() => handleUpdateCartItem(-1)}>
                                    <RemoveCircleIcon />
                                </IconButton>
                                <div className='w-5 h-5 text-xs flex items-center justify-center'>
                                    {item.quantity}
                                </div>
                                <IconButton onClick={() => handleUpdateCartItem(1)}>
                                    <AddCircleOutline />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <p>₹{item.totalPrice}</p>
                </div>
            </div>
            {item.ingredients && item.ingredients.length > 0 &&
                <div className='pt-3 space-x-2'>
                    {item.ingredients.map((ingredient, index) => (
                        <Chip key={index} label={ingredient} />
                    ))}
                </div>
            }
        </div>
    )
}

export default CartItem;