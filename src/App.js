import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ListRecipe } from './components/ListRecipe';
import { AddRecipie } from './components/AddRecipie';
import { RecipeDetail } from './components/RecipeDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<ListRecipe/>}/>
        <Route path='/add' element={<AddRecipie/>}/>
        <Route path='/recipe/:id' element={<RecipeDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
