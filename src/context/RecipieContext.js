import { createContext, useReducer } from "react";

export const RecipeContext = createContext();

const initialState = {
  recipes: [],
};

const recipeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_RECIPE":
      return {
        ...state,
        recipes: [...state.recipe, action.payload],
      };
    case "DELETE_RECIPE":
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
      };
    case "UPDATE_RECIPE":
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.payload.id ? action.payload : recipe
        ),
      };
    default:
      return state;
  }
};

export const RecipeContextProvider = ({ children }) => {
    
  const [recipeState, recipeDispatch] = useReducer(recipeReducer, initialState);

  return (
    <RecipeContext.Provider value={{ recipeDispatch, recipeState }}>
      {children}
    </RecipeContext.Provider>
  );
};
