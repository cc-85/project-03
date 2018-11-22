import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import FlashMessages from './components/FlashMessages';
import Navbar from './components/Navbar';
import ProductsIndex from './components/products/ProductsIndex';
import ProductsShow from './components/products/ProductsShow';
import ProductsHome from './components/products/ProductsHome';
import ProductsNew from './components/products/ProductsNew';
import ProductsEdit from './components/products/ProductsEdit';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/users/Profile';
import ProfileEdit from './components/users/ProfileEdit';


import SecureRoute from './components/SecureRoute';

import 'bulma';
import './scss/style.scss';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <FlashMessages />



          <Switch>
            <SecureRoute path="/products/new" component={ProductsNew} />
            <SecureRoute path="/products/:id/edit" component={ProductsEdit} />
            <Route path="/products/:id" component={ProductsShow} />
            <Route path="/products" component={ProductsIndex} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <SecureRoute path="/profile/:id/edit" component={ProfileEdit} />
            <SecureRoute path="/profile" component={Profile} />
            <Route path="/" component={ProductsHome} />
          </Switch>


        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
