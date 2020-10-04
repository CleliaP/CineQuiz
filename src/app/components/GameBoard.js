import React from 'react'
import { getMovieList, getPersonsFromApi} from '../service/api';
import Questions from './questions.js'

import './gameBoard.css'


class GameBoard extends React.Component {

    state = {
        allMovies: [],
        allPersons: []
    }

    componentWillMount(){
        this.getAllMovie()
        this.getAllPersons()
    }

    getAllMovie = () => {
        getMovieList().then(movies => {this.setState({allMovies: movies.results})})
    }

    getAllPersons = () => {
        getPersonsFromApi().then(persons => this.setState({ allPersons: persons.results}))
    }

    render() {
        return (
            <div className="GameBoard"> 
            {
                this.state.allMovies.length > 0 && this.state.allPersons.length > 0 ?
                <Questions allMovies= {this.state.allMovies} allPersons={this.state.allPersons}></Questions> 
                : null
            }
            </div>
        )
    }
}

export default GameBoard
