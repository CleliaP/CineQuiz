import React from 'react'
import GameBoard from './GameBoard'


export default class GameOver extends React.Component {
    
    state = {
        retryGame: false
    }



    render() {
        return(
            <div className="GameOver">
                <h1>Game Over</h1>
                <span>Score: </span>
                <button onClick={this.setState({retryGame: true})}>Retry</button>
            </div>
        )
    }
}
