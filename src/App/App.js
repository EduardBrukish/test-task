import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import { Registration, LogIn, Products } from '../pages';

import './App.scss';

function App() {
  return (
    <Switch>
      <Route path="/" component={ LogIn } exact />
      <Route path="/registration" component={ Registration } />
      <Route path="/products" component={ Products } />
    </Switch>
  );
}

export default App;
