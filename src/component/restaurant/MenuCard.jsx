import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../State/Cart/Action';

const demo = [
  {
    category: "Extra Cheese",
    ingredients: ["Extra Cheese"]
  },
  {
    category: "ketchup", 
    ingredients: ["Extra ketchup", "Extra sauce"]
  }
]

const MenuCard = ({ item }) => {
  const dispatch=useDispatch()
  console.log("item food values ARE HERHEEEEEEEEEEE", item)
  
  // State to track selected ingredients
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  
  const handleCheckBoxChange = (ingredient) => {
    console.log("Toggling ingredient:", ingredient);
    
    setSelectedIngredients(prev => {
      if (prev.includes(ingredient)) {
        // Remove ingredient if already selected
        const updated = prev.filter(item => item !== ingredient);
        console.log("Removed ingredient. Updated list:", updated);
        return updated;
      } else {
        // Add ingredient if not selected
        const updated = [...prev, ingredient];
        console.log("Added ingredient. Updated list:", updated);
        return updated;
      }
    });
  }

  const handleAddItemToCart = (e) => {
    e.preventDefault()
    const reqdata = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        foodId: item?.id,
        quantity: 1,
        ingredients: selectedIngredients.length > 0 ? selectedIngredients : null, // Use selected ingredients
      }
    };
    dispatch(addItemToCart(reqdata));
    console.log("requested data with selected ingredients:", reqdata)
    console.log("Selected ingredients:", selectedIngredients);
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
              <p>${item?.price || 'N/A'}</p>
              <p className='text-gray-400'>{item?.description || 'No description available'}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          <div className='flex gap-5 flex-wrap'>
            {demo.map((categoryItem) => (
              <div key={categoryItem.category}>
                <p className='font-semibold mb-2'>{categoryItem.category}</p>
                <FormGroup>
                  {categoryItem.ingredients.map((ingredient) => (
                    <FormControlLabel
                      key={ingredient}
                      control={
                        <Checkbox 
                          checked={selectedIngredients.includes(ingredient)}
                          onChange={() => handleCheckBoxChange(ingredient)} 
                        />
                      }
                      label={ingredient}
                    />
                  ))}
                </FormGroup>
              </div>
            ))}
          </div>
          
          {/* Show selected ingredients */}
          {selectedIngredients.length > 0 && (
            <div className='mt-4 p-3 bg-gray-100 rounded-lg'>
              <p className='font-semibold text-sm text-gray-700 mb-2'>Selected Ingredients:</p>
              <div className='flex flex-wrap gap-2'>
                {selectedIngredients.map((ingredient, index) => (
                  <span 
                    key={index} 
                    className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs'
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className='pt-5'>
            <Button 
              variant="contained" 
              disabled={false} 
              type="submit"
            >
              {true ? "Add to Cart" : "Out of Stock"}
              {selectedIngredients.length > 0 && (
                <span className='ml-2 text-xs'>
                  (+{selectedIngredients.length} extra{selectedIngredients.length > 1 ? 's' : ''})
                </span>
              )}
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  )
}

export default MenuCard