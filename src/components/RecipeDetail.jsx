import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { RecipeContext } from "../context/RecipieContext";

export const RecipeDetail = () => {
  const { id } = useParams();
  const { recipeState } = useContext(RecipeContext);
  const { recipes } = recipeState;
  const recipe = recipes.find((recipe) => recipe.id === id);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>Cuisine: {recipe.cuisine}</p>
      <h3>Ingredients:</h3>
      <p>{recipe.ingredients}</p>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
};
