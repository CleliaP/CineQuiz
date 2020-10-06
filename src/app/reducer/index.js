import { combineReducers } from 'redux';
import moviesReducer from './movies.js';
import movieReducer from './movie.js';
import actorsReducer from './actors.js';
import actorReducer from './actor.js';
import scoreReducer from './score.js';
import playerReducer from './player.js';
import gameReducer from './game.js'

const rootReducer = combineReducers({
	movies: moviesReducer,
	movie: movieReducer,
	actors: actorsReducer,
	actor: actorReducer,
	score: scoreReducer, 
	statusPlayer: playerReducer,
	game: gameReducer
});

export default rootReducer;
