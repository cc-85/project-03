import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FlashMessages from './components/FlashMessages';
import Navbar from './components/Navbar';
import ProductsIndex from './components/products/ProductsIndex';
import ProductsShow from './components/products/ProductsShow';
import ProductsNew from './components/products/ProductsNew';
import ProductsEdit from './components/products/ProductsEdit';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/users/Profile';

import SecureRoute from './components/SecureRoute';

import 'bulma';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <FlashMessages />
          <main className="section">
            <div className="container">


              <h1>Selling App</h1>

              <Switch>
                <SecureRoute path="/products/new" component={ProductsNew} />
                <SecureRoute path="/products/:id/edit" component={ProductsEdit} />
                <Route path="/products/:id" component={ProductsShow} />
                <Route path="/products" component={ProductsIndex} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <SecureRoute path="/profile" component={Profile} />
                <Route path="/" component={ProductsIndex} />
                <Route path="/products/new" component={ProductsNew} />
              </Switch>

            </div>

          </main>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
