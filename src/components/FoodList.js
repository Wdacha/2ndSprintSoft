import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const FoodList = ({ foods }) => {
  return (
    <List>
      {foods.map((food, index) => (
        <ListItem key={index}>
          <ListItemText primary={food.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default FoodList;
