import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardMedia, CardContent, List, ListItem, ListItemText, Button,Stack,Chip } from "@mui/material";

const DishDetails = ({ dishes, onRemoveSavedDish }) => {
  const { id } = useParams();
  const dish = dishes.find((dish) => dish.id === parseInt(id));
  const navigate=useNavigate();

  if (!dish) {
    return (
      <Container>
        <Typography variant="h4">Dish not found</Typography>
      </Container>
    );

  }
  const handleRemove = () => {
    
    onRemoveSavedDish(dish.id);
    navigate("/saved")
  };

  return (
    <Container>
      <Typography variant="h4">{dish.name}</Typography>
      <Card>
        <CardMedia component="img" height="300" image={dish.img} alt={dish.name} />
        <CardContent>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>

    Cooking Time: {dish.cookingTime} mins | Price: ${dish.price}
  </Typography>

          <Typography variant="h6">Tags:</Typography>
          <List>
            {dish.tags.map((tag, index) => (
              <ListItem key={index}>
                <ListItemText primary={tag} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Ingredients:</Typography>
          <Stack
            direction="row"
            spacing={1}
            marginBottom={2}
            sx={{
              overflowX: 'auto',
              whiteSpace: 'nowrap',
            }}
          >
          {dish.ingredients.map((ingredient, index) => (
            <Chip
              key={index}
              label={ingredient}
              size="small"
              variant="outlined"
            />
          ))}
        </Stack>
          <Typography variant="h6">Steps:</Typography>
          <List>
            {dish.steps.map((step, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${index + 1}. ${step}`} />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="secondary" onClick={handleRemove}>
        Remove from saved dishes
      </Button>
      </CardContent>
      </Card>
    </Container>
  );
};

export default DishDetails;
