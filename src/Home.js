import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import Swipe from "./components/Swipe";
import FoodList from "./components/FoodList";
import { Button } from '@mui/material';



const Home = ({ foodData,onSwipeRight }) => {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [foodList, setFoodList] = useState(foodData);
 

  
  return (
    <Container maxWidth="sm">
      <h1>Dishcovery</h1>
      <Swipe onSwipeRight={onSwipeRight} foodData={foodList} foods={selectedFoods}/>
      
    </Container>
  );
};

export default Home;
