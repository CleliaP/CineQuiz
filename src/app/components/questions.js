import React from 'react'

import { getDetailActor, 
        getMoviesOfActor, 
        getDetailMovie, 
        getImagesofActor, 
        getImagesofMovie } 
from '../service/api';
import getRandomInt from '../helpers/randomNumber'
import { renderNothing } from '../helpers/renderNothing'

import './questions.css'
import * as CONSTANTS from '../../constants.js';
const { BASE_URL_IMAGE_ACTOR } = CONSTANTS;

class Questions extends React.Component {

   state = {
        idActor: null,
        nameActor: null,
        actorMovies: [],
        movieName: null,
        movieId: null,
        rightAnswer: false,
        urlImageActor: null,
        urlImageMovie: null,
        scorePlayer:0
    }

    componentDidMount(){
        this.init()
    }

    init() {
        if(this.props.allMovies.length > 0 && this.props.allPersons.length > 0 ) {
            this.getActorInformations();
            this.getRandomMovie();
        }
    }

    getActorInformations = () => {
        const randomActorID = this.props.allPersons[getRandomInt(this.props.allPersons.length)];
        
        if(randomActorID) {

            const idActor = randomActorID.id

            getDetailActor(idActor).then(data => {
                this.setState({ nameActor: data.name});
            })

            getMoviesOfActor(idActor).then(data => {
                const listIdMovies = [];
                if (data.cast) {
                    if(data.cast.length > 1) data.cast.map(el => listIdMovies.push(el.id));
                    if(data.cast.length === 1) listIdMovies.push(data.cast[0].id)
                    this.setState({ actorMovies: listIdMovies
                });
                }
            }) 
            getImagesofActor(idActor).then(data => {
                const url = BASE_URL_IMAGE_ACTOR + data.profiles[0].file_path
                this.setState({urlImageActor: url})
            })
   
        } ;
    }

    getRandomMovie = () => {
        const randomMovie = this.props.allMovies[getRandomInt(this.props.allMovies.length)];
        if(randomMovie) {
            const movieId = randomMovie.id;
            getDetailMovie(movieId).then(data => {
                this.setState({movieId: movieId})
                this.setState({movieName: data.title})
            });

            getImagesofMovie(movieId).then(data => {
                if(data.posters.length > 0 ) {
                    const url = BASE_URL_IMAGE_ACTOR + data.posters[0].file_path
                    this.setState({urlImageMovie: url})
                } 
            })
        }
    }

    getAnswer = () => {
        this.state.actorMovies.map((i) => (i === this.state.movieId) === true ? 
            this.setState({rightAnswer: true}) : null 
        );
    }

    handleClick = (e) => {
        this.getAnswer();
        e.preventDefault();
        
        if (String(this.state.rightAnswer) === e.target.value) {
            this.setState(prevState => ({
                scorePlayer: prevState.scorePlayer +1
            }));
        }

        this.setState({urlImageMovie: null})
        this.init();
    }

    render() {
        return (
            <div className="Questions">
                <div className="Questions_score">
                    <span>Score: {this.state.scorePlayer} point(s)</span>
                </div>
                <div className="Questions_pictures">
                    <img alt={this.state.nameActor} className={`Questions_pictures-actor ${this.state.urlImageMovie? 'Questions_pictures-actor-not-alone' : ''}`} src={this.state.urlImageActor}></img>
                    { 
                        this.state.urlImageMovie ? 
                            <img alt={this.state.movieName} className="Questions_pictures-movie" src={this.state.urlImageMovie}></img>
                            : renderNothing
                    }
                </div>
                <div className="Questions_question">
                    <span> Did <span className="Questions_question_colorText">{this.state.nameActor}</span> play </span>
                    <span> in <span className="Questions_question_colorText "> {this.state.movieName}</span> ? </span>
                </div>
                <div className="Questions_buttons">
                    <button value={true} onClick={this.handleClick} className='Questions_button-T'>True</button>
                    <button value={false} onClick={this.handleClick} className='Questions_button-F'>False</button>
                </div>
            </div>
        )
    }



}

export default Questions
