import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { RecipeContext } from "../context/RecipieContext";
import ReactModal from "react-modal";

export const AddRecipie = ({isOpen,closeModal}) => {
  const { recipeDispatch, recipeState } = useContext(RecipeContext);
  const [imagePreview, setImagePreview] = useState('');
  const[imageFile,setImageFile]=useState(null);
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
      image: imagePreview,
    };
    console.log(newRecipe)
    recipeDispatch({ type: "ADD_RECIPE", payload: newRecipe });
    setRecipe({
      id: "",
      name: "",
      ingredients: "",
      instructions: "",
      cuisine: "",
      image:null
    });
    console.log(recipeState.recipes);
  };

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={closeModal}  >
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
        <label>
          Image:
          <input
            type="file"
            accept="image/*"
            // value={recipe.image}
            onChange={handleImageChange}
          />
        </label>
        <br />
         {imagePreview && (
          <img src={imagePreview} alt="Recipe" style={{ maxWidth: '200px' }} />
        )}
        <br />
        <button type="submit" onClick={closeModal}>Add Recipe</button>
      </form>
    </ReactModal>
  );
};
