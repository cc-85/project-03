import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductsIndex from './components/products/ProductsIndex';
import ProductsShow from './components/products/ProductsShow';
import ProductsNew from './components/products/ProductsNew';
import ProductsEdit from './components/products/ProductsEdit';
import Login from './components/products/Login';
import Register from './components/products/Register';

import SecureRoute from './components/SecureRoute';

import 'bulma';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />

          <main className="section">
            <div className="container">



              <Switch>
                <SecureRoute path="/products/new" component={ProductsNew} />
                <SecureRoute path="/products/:id/edit" component={ProductsEdit} />
                <Route path="/products/:id" component={ProductsShow} />
                <Route path="/products" component={ProductsIndex} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/" component={ProductsIndex} />
              </Switch>

            </div>

          </main>
          <h1>Hello World!</h1>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
