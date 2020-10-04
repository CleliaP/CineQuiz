import React from 'react'
import { getMovieList, getPersonsFromApi, getDetailPerson, getMoviesPerson, getDetailMovie } from '../service/api';
import getRandomInt from '../helpers/randomNumber.js'

class GameBoard extends React.Component {

   state = {
            allPersons: [],
            allMovies: [],

            idActor: null,
            nameActor: null,
            actorMovies: [],

            movieName: null,
            movieId: null
    }

    async componentDidMount() {
        this.getAllPersons();
        this.getAllMovie();
        

        setTimeout(() => {
            this.getActorInformations();
            this.getRandomMovie();
        }, 100);
    } 

    getAllMovie = () => {
        getMovieList().then(movies => this.setState({allMovies: movies.results}))
    }

    getAllPersons = () => {
        getPersonsFromApi().then(data => {
            this.setState({ allPersons: data.results});
        })
    }

    getActorInformations = () => {
        const randomActor = this.state.allPersons[getRandomInt(this.state.allPersons.length)];
        if( randomActor) {

           this.setState({idActor : randomActor.id} )

            getDetailPerson(this.state.idActor).then(data => {
                this.setState({ nameActor: data.name});
            })

            getMoviesPerson(this.state.idActor).then(data => {
                const listIdMovies = [];
                if(data.cast.length > 1) data.cast.map(el => listIdMovies.push(el.id));
                if(data.cast.length === 1) listIdMovies.push(data.cast[0].id)
                this.setState({ actorMovies: listIdMovies});
            })
                    
                
        } ;
    }

    getRandomMovie = () => {
        const randomMovie = this.state.allMovies[getRandomInt(this.state.allMovies.length)];
        if(randomMovie) {
            this.setState({movieId: randomMovie.id})
            console.log(randomMovie)
            getDetailMovie(this.state.movieId).then(data => {
                this.setState({movieName: data.title})
            });
        }
    }

    getAnswer = () => {

        

        console.log('movieID,',this.state.movieId)
        console.log('moviesActor,',this.state.actorMovies)
    }

    render() {
        return (
            <div>
            <span>{this.state.movieName} Movie name </span>
            <br/>
            <span>{this.state.nameActor} Actor name</span>
            <span></span>
            <button onClick={this.getAnswer}></button>
            </div>

        )
    }



}

export default GameBoard
