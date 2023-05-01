import React, { useState } from "react";
import {
  Button,
  TextField,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const AddFood = ({ onAddFood }) => {
  const [open, setOpen] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const handleSubmit = () => {
    if (foodName.trim() && imageUrl.trim() && tags.length) {
      onAddFood({ name: foodName.trim(), img: imageUrl.trim(), tags });
      setFoodName("");
      setImageUrl("");
      setTags([]);
    }
    setOpen(false);
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Food
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Food Item</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Food Name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
            <TextField
              label="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <TextField
              label="Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTagAdd()}
            />
            <Stack direction="row" spacing={1}>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleTagDelete(tag)}
                />
              ))}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddFood;
