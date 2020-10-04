import React from 'react'

import { getDetailPerson, getMoviesPerson, getDetailMovie } from '../service/api';
import getRandomInt from '../helpers/randomNumber.js'

import './questions.css'

class Questions extends React.Component {

   state = {

            idActor: null,
            nameActor: null,
            actorMovies: [],
            movieName: null,
            movieId: null,
            rightAnswer: false
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

            getDetailPerson(idActor).then(data => {
                this.setState({ nameActor: data.name});
            })

            getMoviesPerson(idActor).then(data => {
                const listIdMovies = [];
                if (data.cast) {
                    if(data.cast.length > 1) data.cast.map(el => listIdMovies.push(el.id));
                    if(data.cast.length === 1) listIdMovies.push(data.cast[0].id)
                    this.setState({ actorMovies: listIdMovies
                });
                }
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
            //TODO: rajouter un point au score
        }

        this.init();
    }

    render() {
        return (
            <div className="Questions">
                <div className="Questions_score">
                    <span>Score: 1 point(s)</span>
                </div>
                <div className="Questions_pictures">
                    <img alt='ij' className="Questions_pictures-actor" src="https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/50/2015/02/eddie-redmayne-scaled.jpg"></img>
                    <img alt='ij' className="Questions_pictures-movie" src="https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/50/2015/02/eddie-redmayne-scaled.jpg"></img>
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
