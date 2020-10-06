import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as CONSTANTS from '../../constants.js';
import { getDetailActor, 
        getDetailMovie, 
        getImagesofMovie, 
        getImagesofActor, 
        getMoviesOfActor } 
from '../actions/index';
import getRandomInt from '../helpers/randomNumber'
import { renderNothing } from '../helpers/renderNothing'
import './questions.css'

const { BASE_URL_IMAGE_ACTOR } = CONSTANTS;

class Questions extends React.Component {

   state = {
        rightAnswer: false,
        scorePlayer:0,
        continueGame: this.props.statusPlayer !== "lost"
    }

    componentDidMount(){
        this.init()
    }

    init() {
        if(this.props.allMovies.length > 0 && this.props.allActors.length > 0 && this.state.continueGame) {
            this.getRandomActor();
            this.getRandomMovie();
        }
    }

    //function that is used to know if we have information about the actor
    getRandomActor = () => {
        const randomActorID = this.props.allActors[getRandomInt(this.props.allActors.length)].id;
        if(randomActorID) {
            this.props.getDetailActor(randomActorID).then(()=> {
                if(this.props.statusActor !== "failed" && this.state.continueGame) {
                    this.setState({nameActor: this.props.actor.name})
                    this.getActorInformations(randomActorID)
                }
            })
        }
    }

    getActorInformations = (id) => {
        if(id) {
            this.props.getImagesofActor(id)

            this.props.getMoviesOfActor(id).then(()=> {
                const listIdMovies = [];
                if(this.props.moviesActor.length > 1) this.props.moviesActor.map(el => listIdMovies.push(el.id));
                if(this.props.moviesActor.length === 1) listIdMovies.push(this.props.moviesActor[0].id)
                this.setState({ actorMovies: listIdMovies})
            })
        } ;
    }

    getRandomMovie = () => {
        const randomMovie = this.props.allMovies[getRandomInt(this.props.allMovies.length)];
         if(randomMovie) {
            const movieId = randomMovie.id;
            this.props.getDetailMovie(movieId)
            this.props.getImagesofMovie(movieId)
        }
    }

    getAnswer = () => {
        if(this.state.actorMovies) {
            this.state.actorMovies.map((i) => (i === this.state.movieId) === true ? 
            this.setState({rightAnswer: true}) : null);
        }
    }

    handleClick = (e) => {
        this.getAnswer();
        e.preventDefault();
        
        if (String(this.state.rightAnswer) === e.target.value) {
            this.setState(prevState => ({
                scorePlayer: prevState.scorePlayer + 1
            }))
            this.props.updateScore(this.state.scorePlayer +1)
        }
        
        if(this.props.statusPlayer !== "lost")  this.init();
    }

    render() {
        const { imageMovie, imageActor } = this.props
        return (
            <div className="Questions">
                <div className="Questions_score">
                    <span>Score: {this.state.scorePlayer} point(s)</span>
                </div>
                <div className="Questions_pictures">
                    {
                        imageActor ? 
                        <img alt={this.state.nameActor} 
                            className={`Questions_pictures-actor ${imageMovie ? 'Questions_pictures-actor-not-alone' : ''}`}
                            src={BASE_URL_IMAGE_ACTOR + imageActor}>
                        </img>
                        : renderNothing()
                    }
                    { 
                        imageMovie && imageMovie.file_path ? 
                            <img alt={this.state.movieName} 
                                className="Questions_pictures-movie" 
                                src={BASE_URL_IMAGE_ACTOR + imageMovie.file_path }>
                            </img>
                            : renderNothing()
                    }
                </div>
                <div className="Questions_question">
                {
                    this.props.actor ? 
                    <span> Did <span className="Questions_question_colorText">{this.state.nameActor}</span> play </span>
                    : renderNothing()
                }
                {
                    this.props.movie ? 
                    <span> in <span className="Questions_question_colorText "> {this.props.movie.title}</span> ? </span>
                    : renderNothing()
                }
                </div>
                <div className="Questions_buttons">
                    <button value={true} onClick={this.handleClick} className='Questions_button-T'>True</button>
                    <button value={false} onClick={this.handleClick} className='Questions_button-F'>False</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps= (state) => {
    return{
        allMovies: state.movies.movies,
        allActors: state.movies.movies,
        actor: state.actor.actor,
        statusActor: state.actor.status,
        imageActor: state.actor.imageActor,
        moviesActor: state.actor.moviesActor,
        movie: state.movie.movie,
        imageMovie: state.movie.imageMovie,
        statusPlayer: state.statusPlayer.status
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getDetailActor: getDetailActor,
    getDetailMovie: getDetailMovie,
    getImagesofMovie: getImagesofMovie,
    getImagesofActor: getImagesofActor,
    getMoviesOfActor: getMoviesOfActor,
    updateScore: (score) => dispatch({type: "UPDATE_SCORE",payload:score})
    }, dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(Questions);
