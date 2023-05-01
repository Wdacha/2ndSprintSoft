  import React, { useState, useEffect } from "react";
  import {
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
    Chip,
    CardMedia,
    Slider,
    Collapse,
    IconButton
  } from "@mui/material";
  import { Refresh as RefreshIcon } from '@mui/icons-material';
  import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";


    

  const Swipe = ({ onSwipeRight , foods, foodData}) => {
      const [currentIndex, setCurrentIndex] = useState(0);
      const [filteredData, setFilteredData] = useState(foodData);
      const [selectedTags, setSelectedTags] = useState([]);
    

      const [cookingTimeFilter, setCookingTimeFilter] = useState([0, 120]);

      
    const handleCookingTimeFilterChange = (event, newValue) => {
      setCookingTimeFilter(newValue);
    };
      

      const handleSwipe = (direction) => {
        if (direction === "right") {
          onSwipeRight(filteredData[currentIndex].id);
        }
    
        setCurrentIndex((prevIndex) => prevIndex + 1);
      };
    
      const handleTagClick = (tag) => {
        const newSelectedTags = selectedTags.includes(tag)
          ? selectedTags.filter((t) => t !== tag)
          : [...selectedTags, tag];
    
        setSelectedTags(newSelectedTags);
    
        if (newSelectedTags.length > 0) {
          setFilteredData(
            foodData.filter((food) =>food.tags.some((foodTag) => newSelectedTags.includes(foodTag))
            ).filter((food) =>!foods.some((selected) => selected.id === food.id)
            )
          );
        } else {
          setFilteredData(
            foodData.filter((food) =>
              !foods.some((selected) => selected.id === food.id)
            )
          );
        }
    
        setCurrentIndex(0);
      };

      
    
      const renderTags = () => {
        const allTags = Array.from(new Set(foodData.flatMap((food) => food.tags)));
      
        return (
          <Stack
            direction="row"
            spacing={1}
            marginBottom={2}
            sx={{
              overflowX: 'auto',
              whiteSpace: 'nowrap',
            }}
          >
            {allTags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onClick={() => handleTagClick(tag)}
                color={selectedTags.includes(tag) ? 'primary' : 'default'}
              />
            ))}
          </Stack>
        );
      };
      

      useEffect(() => {
        const filteredByTags =
          selectedTags.length > 0
            ? foodData.filter((food) =>
                food.tags.some((foodTag) => selectedTags.includes(foodTag))
              )
            : foodData;
    
        const filteredByCookingTime = filteredByTags.filter(
          (food) =>
            food.cookingTime >= cookingTimeFilter[0] &&
            food.cookingTime <= cookingTimeFilter[1]
        );
    
        const filteredFinal = filteredByCookingTime.filter(
          (food) => !foods.some((selected) => selected.id === food.id)
        );
    
        setFilteredData(filteredFinal);
        setCurrentIndex(0);
      }, [selectedTags, cookingTimeFilter, foodData, foods]);

      const [showSlider, setShowSlider] = useState(false);

      const handleShowSlider = () => {
        setShowSlider((prevShowSlider) => !prevShowSlider);
      };
    
      const renderCookingTimeFilter = () => {
        return (
          <Stack spacing={2} marginBottom={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Filter by Cooking Time</Typography>
              <IconButton onClick={handleShowSlider}>
                {showSlider ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            </Stack>
            <Collapse in={showSlider}>
              <Slider
                value={cookingTimeFilter}
                onChange={handleCookingTimeFilterChange}
                valueLabelDisplay="auto"
                min={0}
                max={120}
                marks
                step={5}
              />
            </Collapse>
            <Typography variant="body" color="text.secondary">
              {cookingTimeFilter[0]} - {cookingTimeFilter[1]} minutes
            </Typography>
          </Stack>
        );
      };
    

      const handleRefresh = () => {
        window.location.reload();
      }
    
    
      return (
        <div>
          {renderTags()}
          {renderCookingTimeFilter()}
          {currentIndex < filteredData.length ? (
            <>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={filteredData[currentIndex].img}
                  alt={filteredData[currentIndex].name}
                />
                <CardContent>
                <Typography>{filteredData[currentIndex].name}</Typography>
    <Typography variant="body2" color="text.secondary">
      Cooking Time: {filteredData[currentIndex].cookingTime} mins
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Price: ${filteredData[currentIndex].price}
    </Typography>
                  <Stack direction="row" spacing={1} marginTop={1}>
                    {filteredData[currentIndex].tags.map((tag, index) => (
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
  <Stack direction="row" justifyContent="center" spacing={2} marginTop={2}>
  <Button variant="contained" onClick={() => handleSwipe("left")}>
  Left
  </Button>
  <Button variant="contained" onClick={() => handleSwipe("right")}>
  Right
  </Button>

  </Stack>
  <Button variant="contained" color="primary" onClick={handleRefresh} ><RefreshIcon />
      </Button>
  </>
  ) : (
    <>
  <Typography>No more food items</Typography>
  <Button variant="contained" color="primary" onClick={handleRefresh} ><RefreshIcon />
      </Button>
  </>
  )}
  </div>
  );
  };

  export default Swipe;