import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductsIndex from './components/products/ProductsIndex';
import ProductsShow from './components/products/ProductsShow';

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
                <Route path="/products/:id" component={ProductsShow} />
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
