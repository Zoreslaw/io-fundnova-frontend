import React, { useState } from "react";
import { TextField, MenuItem, Box, Typography, Button, Grid } from "@mui/material";

const categories = [
  { name: "Music", subcategories: ["Classical", "Rock", "Pop"] },
  { name: "Technology", subcategories: ["Gadgets", "AI", "Robotics"] },
  { name: "Art", subcategories: ["Painting", "Sculpture", "Digital"] },
  { name: "Film", subcategories: ["Short", "Feature", "Documentary"] },
];

const CategorySelector = ( onNext: any ) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const handleNext = () => {
    if (selectedCategory && selectedSubcategory) {
      onNext({ category: selectedCategory, subcategory: selectedSubcategory });
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>
        Select a primary category and subcategory for your new project
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            select
            label="Category"
            fullWidth
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.name} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="Subcategory"
            fullWidth
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            disabled={!selectedCategory}
          >
            {selectedCategory &&
              categories
                .find((cat) => cat.name === selectedCategory)
                ?.subcategories.map((subcategory) => (
                  <MenuItem key={subcategory} value={subcategory}>
                    {subcategory}
                  </MenuItem>
                ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!selectedCategory || !selectedSubcategory}
            onClick={handleNext}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategorySelector;
