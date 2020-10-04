import React from 'react';

import GameBoard from './app/components/gameBoard.js'
import './App.css';

export class App extends React.Component {


  render() {

    return (
      <div className="App">
        <header className="App-header">
        </header>
        <GameBoard></GameBoard>
      </div>
    );
  }
}

export default App;
