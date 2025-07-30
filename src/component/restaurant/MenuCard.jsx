import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';


const demo=[
  {
    category:"Nuts And Seeds",
    ingredients:["Cashews"]
  },
   {
    category:"Protein",
    ingredients:["Grond Beef","Bacon Strips"]
  }
]

const MenuCard = () => {
  const handleCheckBoxChange=(value)=>{
console.log("value")
  }
  return (
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className='lg:flex items-center justify-between'>
            <div className='lg:flex items-center lg:gap-5'>
              <img  className='w-[7rem] h-[7rem] object-cover' src="https://cdn.pixabay.com/photo/2022/02/12/21/22/toast-7009956_1280.jpg" alt="" />
           <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
            <p className='font-semibold text-xl'> Sandwitch</p>
            <p>399</p>
            <p className='text-gray-400'>nice food very good are u ok</p>

           </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form>
            <div className='flex gap-5 flex-wrap'>
             {
  demo.map((categoryItem) => (
    <div key={categoryItem.category}>
      <p>{categoryItem.category}</p>
      <FormGroup>
        {categoryItem.ingredients.map((ingredient) => (
          <FormControlLabel
            key={ingredient}
            control={
              <Checkbox onChange={() => handleCheckBoxChange(ingredient)} />
            }
            label={ingredient}
          />
        ))}
      </FormGroup>
    </div>
  ))
}

            </div>

            <div className='pt-5'>
              <Button variant="contained" disabled={false} type="submit">
                {true?"add to cart":"Out of Stock"}
              </Button>
            </div>

          </form>
        </AccordionDetails>
      </Accordion>
  )
}

export default MenuCard