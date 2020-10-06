import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getMovies, getActors } from '../actions/index';


class GameOver extends React.Component {

    componentWillMount() {
        this.calculateHighestScore()
    }

    retry = (e) => {
        e.preventDefault();
        this.props.getMovies()
        this.props.getActors().then(() => this.props.updateStatusPlayer())
    }

    calculateHighestScore() {
        if(this.props.score > this.props.highScore) this.props.updateHighestScore(this.props.score)
    }

    render() {
        return(
            <div className="GameOver">
                <h1>Game Over</h1>
                <span>Score: {this.props.score} </span>
                <span>HighScore: {this.props.highScore} </span>
                <button onClick={this.retry}>Retry</button>
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
    getMovies: getMovies,
    getActors: getActors,
    updateStatusPlayer: () => dispatch({type: "UPDATE_STATUS_PLAYER", payload: 'game'}),
    updateHighestScore: (payload) => dispatch({type: "UPDATE_HIGHEST_SCORE", payload: payload }),
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);
