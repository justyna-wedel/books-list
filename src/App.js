import React, { Component } from 'react';
import ItemsList from './Components/ItemsList/ItemsList';
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.scss";

class App extends Component {
 
  render() {
    return (
      <div className="App container">
        <ItemsList />
      </div>
    );
  }
}

export default App;
