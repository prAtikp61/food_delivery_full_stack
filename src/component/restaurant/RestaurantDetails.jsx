import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import MenuCard from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById ,getRestaurantsCategory} from '../State/Restaurant/Action';
import { store } from '../State/store';
import { getMenuItemByRestaurantId } from '../State/Menu/Action';


const FoodTypes=[
  {label:"All",value:"all"},
   {label:"vegetarian only",value:"vegetarian"},
   {label:"non-vegetarian",value:"non-veg"},
   {label:"seasonal",value:"seasonal"},
]

const RestaurantDetails = () => {
     const navigate = useNavigate()
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")
    const { auth,restaurant,menu } = useSelector(store => store)
    
    // Fallback to ensure we have safe defaults
    const safeMenu = {
      menuItems: [],
      isLoading: false,
      error: null,
      ...menu
    };
    const safeRestaurant = {
      categories: [],
      restaurant: null,
      ...restaurant
    };

    const {id,city,title}=useParams(); // ✅ Extract all 3 parameters
    
    // Debug logs
    console.log("Raw URL params:");
    console.log("city:", city);
    console.log("title:", title); 
    console.log("id:", id);
    console.log("Current URL:", window.location.href);
    console.log("Number(id):", Number(id));
    console.log("Is id valid?", !isNaN(Number(id)));

    console.log("JWT:", jwt);
    console.log("Restaurant ID:", id);

    console.log("restaurant",safeRestaurant)
    console.log("menu",safeMenu)
    console.log("menu.menuItems specifically:", safeMenu?.menuItems)
    console.log("Type of menu.menuItems:", typeof safeMenu?.menuItems)
    console.log("Is menu.menuItems an array?", Array.isArray(safeMenu?.menuItems))

   useEffect(() => {
    console.log("Raw ID:", id);
    console.log("Current menu state:", menu);
    console.log("Current restaurant state:", restaurant);
    
    // Clean the ID by removing any non-numeric characters except digits
    const cleanId = id ? id.replace(/[^0-9]/g, '') : null;
    console.log("Cleaned ID:", cleanId);
    
    if (cleanId && !isNaN(Number(cleanId)) && jwt) {
        console.log("Making API call with cleaned ID:", Number(cleanId));
        
        // Get all menu items without filters so we can filter on frontend
        const menuParamsAll = {
            jwt: jwt,
            restaurantId: Number(cleanId),
            vegetarian: true,    // Include vegetarian items
            nonveg: true,        // Include non-veg items  
            seasonal: true       // Include seasonal items
            // This will get ALL items, then we filter on frontend
        };
        
        console.log("Menu API call parameters (get all items):", menuParamsAll);
        
        dispatch(getRestaurantById({jwt: jwt, restaurantId: Number(cleanId)}));
        dispatch(getRestaurantsCategory({jwt: jwt, restaurantId: Number(cleanId)}));
        dispatch(getMenuItemByRestaurantId(menuParamsAll));
    } else {
        console.error("Invalid ID or missing JWT:", { originalId: id, cleanId, jwt });
    }
}, [id, jwt, dispatch]);


  const [FoodType,setFoodType]=useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  
  // Filter the menu items based on selected filters
  const getFilteredMenuItems = () => {
    if (!safeMenu.menuItems || safeMenu.menuItems.length === 0) {
      return [];
    }
    
    let filtered = [...safeMenu.menuItems];
    
    // Filter by food type (vegetarian/non-veg/seasonal)
    if (FoodType !== "all") {
      filtered = filtered.filter(item => {
        switch(FoodType) {
          case "vegetarian":
            return item.vegetarian === true;
          case "non-veg":
            return item.vegetarian === false;
          case "seasonal":
            return item.seasonal === true;
          default:
            return true;
        }
      });
    }
    
    // Filter by food category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => {
        return item.foodCategory?.name === selectedCategory;
      });
    }
    
    console.log("Filtered items:", filtered);
    console.log("Applied filters - FoodType:", FoodType, "Category:", selectedCategory);
    
    return filtered;
  };

  const handleFilter=(e)=>{
    console.log("Filter changed:", e.target.value, "Name:", e.target.name);
    
    if (e.target.name === "food_type") {
      setFoodType(e.target.value);
    } else if (e.target.name === "food_category") {
      setSelectedCategory(e.target.value);
    }
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
            src={safeRestaurant.restaurant?.images?.[0] || "https://via.placeholder.com/400"}
            alt="Second"
          />
          <img
            className="w-full md:w-1/2 h-[40vh] object-cover"
            src={safeRestaurant.restaurant?.images?.[1] || "https://via.placeholder.com/400"}
            alt="Third"
          />
        </div>

<div className='pt-3 pb-5'>
  <h1 className='text-4xl font-semibold'>{safeRestaurant.restaurant?.name || 'Loading...'}</h1>
  <p className='text-gray-500 mt-1'>{safeRestaurant.restaurant?.description || 'Loading description...'}</p>

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
          <RadioGroup onChange={handleFilter} name="food_category" value={selectedCategory}>
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="All Categories"
            />
            {safeRestaurant?.categories && safeRestaurant.categories.length > 0 ? (
              safeRestaurant.categories.map((item, index) => (
                <FormControlLabel
                  key={item?.id || item?.name || index}
                  value={item?.name || `category-${index}`}
                  control={<Radio />}
                  label={item?.name || 'Unknown Category'}
                />
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                🏷️ Categories will appear here once loaded
              </Typography>
            )}
          </RadioGroup>
        </FormControl>
      </div>


    </div>
  </div>

  <div className='space-y-5 lg:w-[80%] filter lg:pl-10'>
    {(() => {
      const filteredItems = getFilteredMenuItems();
      
      if (safeMenu?.isLoading) {
        return (
          <div className="text-center py-8">
            <Typography variant="h6" color="textSecondary">Loading delicious menu items...</Typography>
          </div>
        );
      }
      
      if (safeMenu?.error) {
        return (
          <div className="text-center py-8">
            <Typography variant="h6" color="error">Error loading menu: {safeMenu.error}</Typography>
          </div>
        );
      }
      
      if (!safeMenu?.menuItems || safeMenu.menuItems.length === 0) {
        return (
          <div className="text-center py-8">
            <Typography variant="h6" color="textSecondary">
              🍽️ Menu items coming soon!
            </Typography>
            <Typography variant="body2" color="textSecondary" className="mt-2">
              The restaurant is updating their menu. Please check back later.
            </Typography>
          </div>
        );
      }
      
      if (filteredItems.length === 0) {
        return (
          <div className="text-center py-8">
            <Typography variant="h6" color="textSecondary">
              🔍 No items found with current filters
            </Typography>
            <Typography variant="body2" color="textSecondary" className="mt-2">
              Try changing your filter selection to see more items.
            </Typography>
            <Typography variant="body2" color="textSecondary" className="mt-1">
              Active filters: {FoodType !== "all" && `Food Type: ${FoodType}`} {selectedCategory !== "all" && `Category: ${selectedCategory}`}
            </Typography>
          </div>
        );
      }
      
      return (
        <div>
          <div className="mb-4">
            <Typography variant="body2" color="textSecondary">
              Showing {filteredItems.length} of {safeMenu.menuItems.length} items
              {(FoodType !== "all" || selectedCategory !== "all") && (
                <span> (filtered)</span>
              )}
            </Typography>
          </div>
          {filteredItems.map((item, index) => (
            <MenuCard key={item?.id || index} item={item} />
          ))}
        </div>
      );
    })()}
  </div>
</section>

    </div>
  );
};

export default RestaurantDetails;