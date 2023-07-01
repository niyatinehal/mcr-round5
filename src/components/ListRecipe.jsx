import React, { useContext, useState } from "react";
import ReactModal from "react-modal";
import { RecipeContext } from "../context/RecipieContext";
import { Link } from "react-router-dom";
import { AddRecipie } from "./AddRecipie";

import "../Styles/list.css";

export const ListRecipe = () => {
  const { recipeState, recipeDispatch } = useContext(RecipeContext);
  const { recipes } = recipeState;

  const [isModalOpen, setIsModalOpen] = useState(false);
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
      const categoryValue = recipe[searchCategory].toLowerCase();

      return categoryValue.includes(searchQuery.toLowerCase());
    });
    setSearchResults([...filteredRecipes]);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const HandleDelete = (id) => {
    recipeDispatch({ type: "DELETE_RECIPE", payload: id });
    console.log(recipes);
  };

  const listItems = searchQuery.length > 0 ? searchResults : recipes;
  return (
    <div>
      <h2>Recipes</h2>
      <div className="search">
        {/* search */}
        <form onSubmit={handleSubmit}>
          <label>
            Search Query:
            <input
              type="text"
              value={searchQuery}
              onChange={handleChangeQuery}
            />
          </label>
          <br />
          <div>
            <input
              type="radio"
              id="name"
              value="name"
              checked={searchCategory === "name"}
              onChange={handleChangeCategory}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div>
            <input
              type="radio"
              id="ingredients"
              value="ingredients"
              checked={searchCategory === "ingredients"}
              onChange={handleChangeCategory}
            />
            <label htmlFor="ingredients">Ingredients</label>
          </div>
          <div>
            <input
              type="radio"
              id="cuisine"
              value="cuisine"
              checked={searchCategory === "cuisine"}
              onChange={handleChangeCategory}
            />
            <label htmlFor="cuisine">Cuisine</label>
          </div>
          <br />

          <button type="submit">Search</button>
        </form>
        <button onClick={toggleModal}>Add Recipe</button>
        <AddRecipie isOpen={isModalOpen} closeModal={toggleModal} />
      </div>
    <div className="recipe-list">{listItems.map((recipe) => (
        <div className="recipe">
          <div key={recipe.id}>
          <img src={recipe.img}/>
            <h3>{recipe.name}</h3>
            <p>Cuisine: {recipe.cuisine}</p>
            <Link to={`/recipe/${recipe.id}`}>View Details</Link>
            <button onClick={() => HandleDelete(recipe.id)}>Delete </button>
          </div>
        </div>
      ))}</div>
      
    </div>
  );
};
