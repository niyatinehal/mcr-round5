import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { RecipeContext } from "../context/RecipieContext";

export const AddRecipie = () => {
  const { recipeDispatch } = useContext(RecipeContext);
  const [recipe, setRecipe] = useState({
    id: "",
    name: "",
    ingredients: "",
    instructions: "",
    cuisine: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      ...recipe,
      id: uuid(),
    };
    recipeDispatch({ type: "ADD_RECIPE", payload: newRecipe });
    setRecipe({
      id: "",
      name: "",
      ingredients: "",
      instructions: "",
      cuisine: "",
    });
  };

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {" "}
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Recipe Name:
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Ingredients:
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Instructions:
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Cuisine Type:
          <input
            type="text"
            name="cuisine"
            value={recipe.cuisine}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};
