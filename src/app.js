import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductsIndex from './components/products/ProductsIndex';
import ProductsShow from './components/products/ProductsShow';
import ProductsNew from './components/products/ProductsNew';


import 'bulma';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />

          <main className="section">
            <div className="container">


              <h1>Selling App</h1>

              <Switch>
                <Route path="/products/:id" component={ProductsShow} />
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
