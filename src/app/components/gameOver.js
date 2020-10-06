import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import GameBoard from './GameBoard'


class GameOver extends React.Component {
    
    state = {
        retryGame: false
    }



    render() {
        return(
            <div className="GameOver">
                <h1>Game Over</h1>
                <span>Score: {this.props.score}</span>
                <button>Retry</button>
            </div>
        )
    }
}

const mapStateToProps= (state) => {
    return{
        score: state.score.score
    }
}

export default connect(mapStateToProps)(GameOver);
