import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getMovies, getActors } from '../actions/index';


class GameOver extends React.Component {
    
    state = {
        retryGame: false
    }

    retry = (e) => {
        e.preventDefault();
        this.props.getMovies()
        this.props.getActors().then(() => this.props.updateStatusPlayer())
    }

    render() {
        return(
            <div className="GameOver">
                <h1>Game Over</h1>
                <span>Score: {this.props.score}</span>
                <button onClick={this.retry}>Retry</button>
            </div>
        )
    }
}

const mapStateToProps= (state) => {
    return{
        score: state.score.score
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getMovies: getMovies,
    getActors: getActors,
    updateStatusPlayer: () => dispatch({type: "UPDATE_STATUS_PLAYER", payload: 'game'}),
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);
