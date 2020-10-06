import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import GameOver from './gameOver'
import Game from './game'
import './gameBoard.css'

class GameBoard extends React.Component {

    render() {
        return (
            <div className="GameBoard"> 
                {   
                    this.props.statusPlayer === "lose" 
                    ? <GameOver></GameOver>
                    : <Game></Game>
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
