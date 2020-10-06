import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './app/reducer/index';
import GameBoard from './app/components/GameBoard.js'
import logo from './app/styles/img/logoCineQuiz.png'
import './App.css';
import { renderNothing } from './app/helpers/renderNothing'
import GameOver from './app/components/gameOver'


const store = createStore(reducers, (applyMiddleware(thunk)));
export class App extends React.Component {

  state = {
    minutes: 1,
    seconds: 0,
  }
  
  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state

      if (seconds > 0) {
          this.setState(({ seconds }) => ({
            seconds: seconds - 1
          }))
      }
      if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(this.myInterval)
          } else {
            this.setState(({ minutes }) => ({
              minutes: minutes - 1,
              seconds: 59
            }))
          }
      } 
    }, 1000)
  }

  render() {
    const { minutes, seconds } = this.state
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <span className="App-header_logo"><img src={logo} alt="LogoCineQuiz"></img></span>
            <span className="App-header_text">Clélia Pelleteret</span> 
          </header>
          {
            seconds === 0 && minutes === 0 
            ? <GameOver></GameOver>
            :  <GameBoard></GameBoard>
          }
          <div>
            { minutes === 0 && seconds === 0
              ? renderNothing()
              : renderNothing() //<h1>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            }
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
