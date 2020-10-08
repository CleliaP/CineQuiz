import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './configureStore'

import GameBoard from './app/components/GameBoard.js'

import logoCineQuiz from './app/styles/img/logoCineQuiz.png'
import './App.css'
import './app/styles/global.css'


class App extends Component {

  state = {
    beginGame: false
  }

  changeBeginGameValue= () =>{
    this.setState({beginGame: true})
  }
  
  render () {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <header className="App-header">
              <span className="App-header_logo"><img src={logoCineQuiz} alt="LogoCineQuiz"></img></span>
              <span className="App-header_text">Clélia Pelleteret</span> 
            </header>
            <div className="App-body">
            {
              this.state.beginGame 
              ? <GameBoard></GameBoard>
              : <>
                  <div className="App-body_logo"><img src={logoCineQuiz} alt="LogoCineQuiz"></img></div>
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
        </PersistGate>
      </Provider>
    )
  }
}

export default App;
