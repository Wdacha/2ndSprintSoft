import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import AddFood from "./components/AddFood";
import SavedDishes from "./SavedDishes";
import BottomNav from "./components/BottomNav";
import foodData from "./foodData1"
import DishDetails from "./DishDetails";

const App = () => {


  
  const [saved, setSaved] = useState([]);
  const loadInitialState = () => {
    const storedFoods = localStorage.getItem("foods");
    const savedDishes = localStorage.getItem("savedDishes");
    
    if (savedDishes) {
      setSaved(JSON.parse(savedDishes));
    }
  
    return storedFoods ? JSON.parse(storedFoods) : foodData;
  };
  const [foods, setFoods] = useState(loadInitialState);

  useEffect(() => {
    const savedDishes = localStorage.getItem("savedDishes");
    if (savedDishes) {
      setSaved(JSON.parse(savedDishes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedDishes", JSON.stringify(saved));
  }, [saved]);


  const onSwipeRight = (id) => {
   
    const dish = foods.find((food) => food.id === id);
    console.log("swiped right", dish)
    
    if (dish) {
      setSaved([...saved, dish]);
      setFoods(foods.filter((food) => food.id !== id));
    }
  };
  

  useEffect(() => {
    localStorage.setItem("foods", JSON.stringify(foods));
  }, [foods]);

  const handleAddFood = (food) => {
    const newId = foods.length > 0 ? foods[foods.length - 1].id + 1 : 1;
    const newFood = { id: newId, ...food };
    setFoods([...foods, newFood]);
  };

  const removeSavedDish = (id) => {
    const dishToRemove = saved.find((dish) => dish.id === id);
    if (dishToRemove) {
      setSaved(saved.filter((dish) => dish.id !== id));
      setFoods([...foods, dishToRemove]);
    }
  };
  

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
        <div style={{ paddingBottom: "56px" }}>
          <Routes>
            <Route exact path="/" element={<Home foodData={foods} onSwipeRight={onSwipeRight}/>} />
            <Route path="/add" element={<AddFood onAddFood={handleAddFood} />} />
            <Route path="/saved" element={<SavedDishes savedDishes={saved} />} />
            <Route path="/dish/:id" element={<DishDetails dishes={[...foods, ...saved]} onRemoveSavedDish={removeSavedDish} />} />

         
          </Routes>
          <BottomNav />
          </div>
        </header>
      </div>
    </BrowserRouter>
  );
};

export default App;
