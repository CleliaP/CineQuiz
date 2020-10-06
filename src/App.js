import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './app/reducer/index';
import GameBoard from './app/components/GameBoard.js'
import logo from './app/styles/img/logoCineQuiz.png'
import './App.css';

const store = createStore(reducers, (applyMiddleware(thunk)));

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <span className="App-header_logo"><img src={logo} alt="LogoCineQuiz"></img></span>
            <span className="App-header_text">Clélia Pelleteret</span> 
          </header>
          <div>
            <GameBoard></GameBoard>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
