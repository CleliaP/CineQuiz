import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'

import { SocialMediaButtons } from '../media/socialMedia'

import './gameOver.css'
import '../styles/global.css'


class GameOver extends Component {

    componentDidMount() {
        this.calculateHighestScore()
    }

    retry = (e) => {
        e.preventDefault();
        this.props.updateStatusPlayer()
    }

    calculateHighestScore() {
        if(this.props.score > this.props.highScore) this.props.updateHighestScore(this.props.score)
    }

    render() {
        return(
            <div className="GameOver">
                <h1>Game Over</h1>
                <span className="GameOver-score">Score: 
                <span className="text-bold text-orange"> {this.props.score} </span>
                    {
                        this.props.score > 1 
                        ? <span> points</span>
                        : <span> point</span>
                    }
                </span>
                <span className="GameOver-highScore">HighScore: 
                <span className="text-bold text-orange"> {this.props.highScore} </span>
                    {
                        this.props.highScore > 1 
                        ? <span> points</span>
                        : <span> point</span>
                    }
                </span>
                <button className="button GameOver-button" onClick={this.retry}>Try again</button>
                <SocialMediaButtons props={this.props} />
            </div>
        )
    }
}

const mapStateToProps= (state) => {
    return{
        score: state.score.score,
        highScore : state.score.highScore
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    updateStatusPlayer: () => dispatch({type: "UPDATE_STATUS_PLAYER", payload: 'game'}),
    updateHighestScore: (payload) => dispatch({type: "UPDATE_HIGHEST_SCORE", payload: payload }),
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);
