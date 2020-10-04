import React from 'react';

import GameBoard from './app/components/gameBoard.js'
import logo from './app/styles/img/logoCineQuiz.png'
import './App.css';

export class App extends React.Component {


  render() {

    return (
      <div className="App">
        <header className="App-header">
          <span className="App-header_logo"><img src={logo} alt="LogoCineQuiz"></img></span>
          <span className="App-header_text">Clélia Pelleteret</span> 
        </header>
        <GameBoard></GameBoard>
      </div>
    );
  }
}

export default App;
