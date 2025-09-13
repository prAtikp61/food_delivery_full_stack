import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../State/Cart/Action';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';

const MenuCard = ({ item }) => {
    const dispatch = useDispatch();
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const handleCheckBoxChange = (ingredient) => {
        setSelectedIngredients(prev => {
            if (prev.includes(ingredient)) {
                return prev.filter(item => item !== ingredient);
            } else {
                return [...prev, ingredient];
            }
        });
    }

    const handleAddItemToCart = (e) => {
        e.preventDefault();
        const reqdata = {
            token: localStorage.getItem("jwt"),
            cartItem: {
                foodId: item.id,
                quantity: quantity,
                ingredients: selectedIngredients,
            }
        };
        dispatch(addItemToCart(reqdata));
    };

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <div className='lg:flex items-center justify-between'>
                    <div className='lg:flex items-center lg:gap-5'>
                        <img
                            className='w-[7rem] h-[7rem] object-cover'
                            src={item?.images?.[0] || "https://via.placeholder.com/112"}
                            alt=""
                        />
                        <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                            <p className='font-semibold text-xl'>{item?.name || 'Menu Item'}</p>
                            <p>₹{item?.price || 'N/A'}</p>
                            <p className='text-gray-400'>{item?.description || 'No description available'}</p>
                        </div>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <form onSubmit={handleAddItemToCart}>
                    <div className='flex gap-5 flex-wrap'>
                        {item.ingredients?.map((categoryItem) => (
                            <div key={categoryItem.category}>
                                <p className='font-semibold mb-2'>{categoryItem.category}</p>
                                <FormGroup>
                                    {categoryItem.items.map((ingredient) => (
                                        <FormControlLabel
                                            key={ingredient.name}
                                            control={
                                                <Checkbox
                                                    checked={selectedIngredients.includes(ingredient.name)}
                                                    onChange={() => handleCheckBoxChange(ingredient.name)}
                                                />
                                            }
                                            label={ingredient.name}
                                        />
                                    ))}
                                </FormGroup>
                            </div>
                        ))}
                    </div>
                    <div className='pt-5 flex items-center space-x-2'>
                        <IconButton onClick={() => setQuantity(q => Math.max(1, q - 1))} >
                            <RemoveCircleIcon />
                        </IconButton>
                        <span>{quantity}</span>
                        <IconButton onClick={() => setQuantity(q => q + 1)}>
                            <AddCircleOutline />
                        </IconButton>
                    </div>

                    <div className='pt-5'>
                        <Button
                            variant="contained"
                            type="submit"
                        >
                            {"Add to Cart"}
                        </Button>
                    </div>
                </form>
            </AccordionDetails>
        </Accordion>
    )
}

export default MenuCard;