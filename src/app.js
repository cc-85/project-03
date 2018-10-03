import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';

import 'bulma';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />

          <main className="section">
            <div className="container">
{/*
              <Switch>
                <Route path="/products/new" component={ProductsNew} />
              </Switch> */}
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
