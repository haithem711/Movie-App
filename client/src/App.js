import React, { createContext, useReducer } from 'react';
import Movie from './components/Screens/Movie'
import About from './components/Screens/About'
import Navbare from './components/Navbar'
import MovieTitle from './components/Screens/MovieTitle'
import Update from './components/Screens/Update'
import { reducer, initialState } from './reducers/reducer'
import './App.css';
import {
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";
export const MovieContext = createContext()


const Routing = () => {

  return <Switch>
    <Route path="/about">
      <About />
    </Route>
     <Route exact path="/">
      <Movie />
    </Route>
    <Route exact path="/:slug">
      <MovieTitle />
    </Route>
    <Route exact path="/update/:slug">
      <Update />
    </Route>
  </Switch>
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (

    <MovieContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbare />
        <Routing />
      </BrowserRouter>
    </MovieContext.Provider>



  );
}

export default App;
