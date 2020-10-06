import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { getMovies, getActors } from '../actions/index';
import Questions from './questions.js'
import { renderNothing } from '../helpers/renderNothing'

import './game.css'

class Game extends React.Component {

    state = {
        minutes: 0,
        seconds: 10,
    }

    componentDidMount() {
        this.props.getMovies()
        this.props.getActors()

        //initilize the timer
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

    componentDidUpdate() {
        if(this.state.minutes === 0 && this.state.seconds===0){
            this.props.updateStatusPlayer()
        }
    }


    render() {
        const { minutes, seconds} = this.state
        return (
            <div className="Game"> 
            <div>
                { minutes === 0 && seconds === 0
                ? renderNothing()
                : <h1>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
            </div>
            {
              this.props.allMovies.length > 0 && this.props.allActors.length > 0 ?
               <Questions></Questions> 
               //<span>TOTO</span>
                : renderNothing()
            }
            </div>
        )
    }
}

const mapStateToProps= (state) => {
    return{
        allMovies: state.movies.movies,
        allActors: state.movies.movies
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getMovies: getMovies,
    getActors: getActors,
    updateStatusPlayer: () => dispatch({type: "UPDATE_STATUS_PLAYER", payload: 'lose'})
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Game);
