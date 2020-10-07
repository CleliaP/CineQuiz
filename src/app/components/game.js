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
        seconds: 3,
        arrayActors: [],
        arrayMovies: []
    }

    componentDidMount() {
        this.getMoreFromAPI()

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

    //As the API returns us page by page, I created a function to have more than one page of actors or movies
    // I chose 10 pages not to overload the api
    getMoreFromAPI = () => {
        let list = []
        for (let pas = 10; pas > 0; pas--) {
            this.props.getActors(pas).then(data => {
                list.push(data.payload[0].results)
                this.setState({arrayActors: list.flat()})
            })
        }
        let list2 = []
        for (let pas = 10; pas > 0; pas--) {
            this.props.getMovies(pas).then(data => {
                list2.push(data.payload[0].results)
                this.setState({arrayMovies: list2.flat()})
            })
        }
    }

    componentDidUpdate() {
        if( this.state.arrayActors.length === 200) this.props.updateAllActors(this.state.arrayActors)
        if( this.state.arrayMovies.length === 200) this.props.updateAllMovies(this.state.arrayMovies)
        
        if(this.state.minutes === 0 && this.state.seconds===0){
            this.props.updateStatusPlayer()
        }
    }

    componentWillUnmount(){
        this.props.clearMovies()
        this.props.clearActor()
        this.props.clearMovie()
        this.props.clearActors()
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
        allActors: state.actors.actors
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getMovies: getMovies,
    getActors: getActors,
    updateStatusPlayer: () => dispatch({type: "UPDATE_STATUS_PLAYER", payload: 'lost'}),
    updateAllActors: (payload) => dispatch({type: "UPDATE_ALL_ACTORS", payload: payload}),
    updateAllMovies: (payload) => dispatch({type: "UPDATE_ALL_MOVIES", payload: payload}),
    clearMovies: ()=> dispatch({type:"CLEAR_MOVIES",payload:[]}),
    clearMovie: ()=> dispatch({type:"CLEAR_MOVIE",payload:[]}),
    clearActors: ()=> dispatch({type:"CLEAR_ACTORS",payload:[]}),
    clearActor: ()=> dispatch({type:"CLEAR_ACTOR",payload:[]})
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Game);
