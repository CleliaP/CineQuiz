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
        seconds: 5
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

    componentWillUnmount() {
        this.props.clearActors()
        this.props.clearMovies()
    }


    render() {
        const { minutes, seconds} = this.state
        const {allMovies, allActors} = this.props
        return (
            <div className="Game"> 
                {   minutes === 0 && seconds === 0
                    ? renderNothing()
                    : <h1>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
                {
                allMovies && allActors && allMovies.length > 0 && allActors.length > 0 
                    ? <Questions></Questions>  
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
    updateStatusPlayer: () => dispatch({type: "UPDATE_STATUS_PLAYER", payload: 'lost'}),
    clearMovies: ()=> dispatch({type:"CLEAR_MOVIES",payload:[]}),
    clearActors: ()=> dispatch({type:"CLEAR_ACTORS",payload:[]})
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Game);
