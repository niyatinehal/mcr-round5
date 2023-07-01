import React, { useContext, useState } from "react";
import { RecipeContext } from "../context/RecipieContext";

export const SearchRecipe = () => {
  const { recipeState } = useContext(RecipeContext);
  const { recipes } = recipeState;
  const [searchCategory, setSearchCategory] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(recipes);

  const handleChangeCategory = (e) => {
    setSearchCategory(e.target.value);
  };
  const handleChangeQuery = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredRecipes = recipes.filter((recipe) => {
      switch (searchCategory) {
        case "name":
          return recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
        case "ingredients":
          return recipe.ingredients
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        case "cuisine":
          return recipe.cuisine
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        default:
          return false;
      }
    });
    setSearchResults(filteredRecipes);
  };
console.log(searchResults)
  return (
    <div>
      <h2>Search Recipes</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Search Category:
          <select value={searchCategory} onChange={handleChangeCategory}>
            <option value="name">Name</option>
            <option value="ingredients">Ingredients</option>
            <option value="cuisine">Cuisine</option>
          </select>
        </label>
        <br />
        <label>
          Search Query:
          <input type="text" value={searchQuery} onChange={handleChangeQuery} />
        </label>
        <br />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
