import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  InputLabel,
  FormControl,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import ChipInput from "material-ui-chip-input";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";


const AddFood = ({ onAddFood }) => {
  const [foodName, setFoodName] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [foodTags, setFoodTags] = useState([]);
  const [cookingTime, setCookingTime] = useState("");
  const [foodSteps, setFoodSteps] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [openCollapse, setOpenCollapse] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [images,setImages] = useState([
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80",
    "https://downshiftology.com/wp-content/uploads/2021/12/How-to-Make-an-Omelette-main-1.jpg",
    "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1232&q=80", 
    
  
    // Add more image URLs here
  ]);
  const [ingredientsError, setIngredientsError] = useState(false);
  const [tagsError, setTagsError] = useState(false);
  
  const handleAddIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  const handleDeleteIngredient = (ingredientToDelete) => {
    setIngredients(ingredients.filter((ingredient) => ingredient !== ingredientToDelete));
  };

  const handleImageSelection = (imageUrl) => {
    setFoodImage(imageUrl);
  };
  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const handleAddImage = () => {
    if (newImage) {
      setImages((prevImages) => [...prevImages, newImage]);
      setFoodImage(newImage);
      setNewImage("");
      setOpenDialog(false);
    }
  };

  

  const availableIngredients = [
    "Cheese",
    "Tomato",
    "Lettuce",
    "Onion",
    "Chicken",
    "Beef",
    "Mushrooms",
    "Bell peppers",
    "Cucumber",
    "Avocado",
    "Egg",
    "Oil",
    "Salt"
  ];


  const availableTags = ["Italian", "Fast food", "American", "Japanese", "Healthy","Moroccan","Breakfast"];
 

  const [tagError, setTagError] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      foodName.trim() &&
      foodImage.trim() &&
      foodTags.length > 0 &&
      ingredients.length > 0 &&
      cookingTime.trim() &&
      foodPrice.trim()
    ) {
      onAddFood({
        id: Date.now(),
        name: foodName.trim(),
        img: foodImage.trim(),
        tags: foodTags,
        cookingTime: parseInt(cookingTime),
        ingredients:ingredients,
        price: parseFloat(foodPrice),
        steps: foodSteps.trim().split("\n"),
      });
      
  
      // Reset form fields
      setFoodName("");
      setFoodImage("");
      setFoodTags([]);
      setCookingTime("");
      setIngredients([]);
      setFoodPrice("");
      setFoodSteps("");
    }
    else {
      if (ingredients.length === 0) {
        setIngredientsError(true);
      }
      if (foodTags.length === 0) {
        setTagsError(true);
      }
    }
    
    
  };
  

  return (
    <Container maxWidth="sm">
      <h1>Add New Dish</h1>
      <form onSubmit={handleSubmit}>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Food Name"
              variant="outlined"
              fullWidth
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
          <Autocomplete
      multiple
      options={availableIngredients}
      value={ingredients}
      onChange={(event, newValue) => {
        setIngredients(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Ingredients"
          variant="outlined"
          error={ingredientsError}
          helperText={ingredientsError ? "Please select at least one ingredient" : ""}
        />
      )}
    />
</Grid>
<Grid item xs={12}>
<Grid container alignItems="center">
<Container maxWidth="sm">
          <Grid item xs={10}>
            <InputLabel htmlFor="food-image">Image    <IconButton size="small" onClick={() => setOpenCollapse((prev) => !prev)}>
              {openCollapse ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </IconButton></InputLabel>
          </Grid>
          <Grid item xs={1}>
            
          </Grid>
          </Container>
        </Grid>
      <Collapse in={openCollapse} collapsedHeight={0}>
        <Grid
          container
          spacing={2}
          id="image-selection"
          style={{ marginTop: 8 }}
        >
          {images.map((image) => (
            <Grid item xs={6} sm={4} key={image}>
              <Card
                onClick={() => handleImageSelection(image)}
                style={{
                  border: image === foodImage ? "2px solid #3f51b5" : "",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt=""
                    height="140"
                    image={image}
                  />
                </CardActionArea>
              </Card>
              
            </Grid>
          ))}
          <Grid item xs={6} sm={4}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
            >
              Add Image
            </Button>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>Add your own image</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter the URL of the image you want to add.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="image-url"
                  label="Image URL"
                  type="url"
                  fullWidth
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleAddImage}>Add</Button>
                </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
          <Grid item xs={12}>
  <TextField
    label="Price"
    variant="outlined"
    fullWidth
    type="number"
    value={foodPrice}
    onChange={(e) => setFoodPrice(e.target.value)}
    required
  />
</Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" required>
              
            <Autocomplete
      multiple
      options={availableTags}
      value={foodTags}
      onChange={(event, newValue) => {
        setFoodTags(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Tags"
          variant="outlined"
          error={tagsError}
          helperText={tagsError ? "Please select at least one tag" : ""}
        />
      )}
    />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Cooking Time (mins)"
              variant="outlined"
              fullWidth
              type="number"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
  <TextField
    label="Steps (one step per line)"
    variant="outlined"
    multiline
    rows={4}
    fullWidth
    value={foodSteps}
    onChange={(e) => setFoodSteps(e.target.value)}
    required
  />
</Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
Add Food
</Button>
</Grid>


</Grid>
</form>
</Container>
);
};

export default AddFood;
