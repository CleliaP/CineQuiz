import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './app/reducer/index'
import GameBoard from './app/components/GameBoard.js'
import logo from './app/styles/img/logoCineQuiz.png'
import './App.css';

const store = createStore(reducers, (applyMiddleware(thunk)));

class App extends React.Component {

  state = {
    beginGame: false
  }

  changeBeginGameValue= () =>{
    this.setState({beginGame: true})
  }
  
  render () {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <span className="App-header_logo"><img src={logo} alt="LogoCineQuiz"></img></span>
            <span className="App-header_text">Clélia Pelleteret</span> 
          </header>
          <div className="App-body">
          {
            this.state.beginGame 
            ? <GameBoard></GameBoard>
            : <>
                <div className="App-body_logo"><img src={logo} alt="LogoCineQuiz"></img></div>
                <div className="App-body_rules">
                   <h2> Welcome to the quizz ! </h2>
                  <span className="pt5"> You'll be asked a series of <span className="text-bold">"Yes or No"</span> questions.</span>
                  <span className="pt5">Answer as many as you can in the allowed time ! </span>
                  <span className="pt5">Good luck !</span>
                </div>
                <button className="App-body_button" onClick={this.changeBeginGameValue}>Let's Start</button>
              </>
          }
          </div>
        </div>
      </Provider>
    )
  }
}

export default App;
