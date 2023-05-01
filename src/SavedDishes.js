import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography,Container,Stack , Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SavedDishes = ({ savedDishes }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/dish/${id}`);
  };

  return (
    <Container>
        <h1>Saved Dishes</h1>
    <Grid container spacing={3}>
        
      {savedDishes.map((dish) => (
        <Grid item xs={12} sm={6} md={4} key={dish.id} onClick={() => handleClick(dish.id)}>
          <Card>
            <CardMedia component="img" height="140" image={dish.img} alt={dish.name} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {dish.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
    Cooking Time: {dish.cookingTime} mins
                </Typography>
                <Stack direction="row" spacing={1} marginTop={1}>
                  {dish.tags.map((tag, index) => (
                    <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
/>
))}
</Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Container>
  );
};

export default SavedDishes;
