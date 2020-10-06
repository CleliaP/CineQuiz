import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { getMovies, getActors } from '../actions/index';
import Questions from './questions.js'
import { renderNothing } from '../helpers/renderNothing'

import './gameBoard.css'

class GameBoard extends React.Component {

    state = {
        allMovies: [],
        allActors: []
    }

    componentWillMount(){
        this.props.getMovies()
        this.props.getActors()
    }

    render() {
        return (
            <div className="GameBoard"> 
            {
                this.props.allMovies.length > 0 && this.props.allActors.length > 0 ?
                <Questions allMovies= {this.props.allMovies} allActors={this.props.allActors}></Questions> 
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
    getActors: getActors
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(GameBoard);
