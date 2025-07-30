import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import MenuCard from './MenuCard';

const menu=[1,1,1,1,1,1]

const categories=[
  "pizza",
  "biryani",
  "burger",
  "chicken",
  "rice"
]

const FoodTypes=[
  {label:"All",value:"all"},
   {label:"vegetarian only",value:"vegetarian"},
   {label:"non-vegetarian",value:"non-veg"},
   {label:"seasonal",value:"seasonal"},


]

const RestaurantDetails = () => {
  const [FoodType,setFoodType]=useState("all")
  const handleFilter=(e)=>
    {console.log(e.target.value,e.target.name)
      
    }

  return (
    <div className="px-5 lg:px-20 bg-black text-white min-h-screen">
      <section>
        <h3 className="text-gray-500 py-2 mt-10">Home / India / Indian Food</h3>

        {/* First image full width */}
        <div className="w-full mb-4">
          <img
            className="w-full h-[40vh] object-cover"
            src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg"
            alt="First"
          />
        </div>

        {/* 2nd row with 2 images side by side */}
        <div className="flex flex-col md:flex-row gap-4">
          <img
            className="w-full md:w-1/2 h-[40vh] object-cover"
            src="https://images.pexels.com/photos/3656787/pexels-photo-3656787.jpeg"
            alt="Second"
          />
          <img
            className="w-full md:w-1/2 h-[40vh] object-cover"
            src="https://images.pexels.com/photos/2079295/pexels-photo-2079295.jpeg"
            alt="Third"
          />
        </div>

<div className='pt-3 pb-5'>
  <h1 className='text-4xl font-semibold'>Indian Fast FOod</h1>
  <p className='text-gray-500 mt-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam tempore voluptate quos labore
     ipsa atque officiis veritatis mollitia animi doloribus a voluptatum, nam repudiandae, veniam cumque ut adipisci
      dignissimos ullam?</p>

  <div className='space-y-3 mt-3'>
    <p className='text-gray-500 flex items-center gap-3'>
    <LocationOnIcon/>
    <span>Mumbai Maharashtra</span>
  </p>
  <p className='text-gray-500 flex items-center gap-3'>
    <CalendarMonthIcon/>
    <span>Mon-Sun : 9:00AM TO 9:00PM</span>
  </p> 
  </div>
   </div>
      </section>
      <Divider/>
      <section className='pt-[2rem] lg:flex relative'>
  <div className='space-y-10 lg:w-[20%]  filter'>
    <div className='box space-y-5 lg:sticky top-28'>
      <div>
        <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
          Food Types
        </Typography>
        <FormControl className='py-10 space-y-5' component="fieldset">
          <RadioGroup onChange={handleFilter} name="food_type" value={FoodType}>
            {FoodTypes.map((item) => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={<Radio />}
                label={item.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>

<Divider/>
<div>
        <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
          Food Categories
        </Typography>
        <FormControl className='py-10 space-y-5' component="fieldset">
          <RadioGroup onChange={handleFilter} name="food_type" value={FoodType}>
            { categories.map((item) => (
              <FormControlLabel
                key={item}
                value={item}
                control={<Radio />}
                label={item}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>


    </div>
  </div>

  <div className='space-y-5 lg:w-[80%] filter lg:pl-10'>

    {menu.map((item)=><MenuCard/>)}
  </div>
</section>

    </div>
  );
};

export default RestaurantDetails;
