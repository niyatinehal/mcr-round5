import React, { useContext } from "react";
import { RecipeContext } from "../context/RecipieContext";
import { Link } from "react-router-dom";

export const ListRecipe = () => {
  const {recipeState}=useContext(RecipeContext);
  const{recipes}=recipeState;
  

  return <div>
    <h2>Recipes</h2>
    {recipes.map((recipe)=>(
      <div key={recipe.id}>
        <h3>{recipe.name}</h3>
        <p>Cuisine: {recipe.cuisine}</p>
        <Link to={`/recipe/${recipe.id}`}>View Details</Link>
      </div>
    ))}
  </div>;
};
