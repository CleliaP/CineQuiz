import React, { Component } from 'react'
import { connect } from "react-redux"

import GameOver from './gameOver'
import Game from './game'
import './gameBoard.css'

class GameBoard extends Component {
    render() {
        return (
            <div className="GameBoard"> 
                {   
                    this.props.statusPlayer === "game" 
                    ? <Game></Game>
                    : <GameOver></GameOver>
                }
            </div>
        )
    }
}

const mapStateToProps= (state) => {
    return{
        statusPlayer: state.statusPlayer.status
    }
}

export default connect(mapStateToProps)(GameBoard);
