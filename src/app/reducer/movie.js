/* eslint-disable default-case */
const initialState = {
  movie: []
}

const movieReducer = (state=initialState,action) => {
  switch(action.type){
    case "GET_DETAIL_MOVIE_COMPLETED":{
        return{
            ...state,
            movie: action.payload[0]
        }
    }
    case "GET_IMAGE_MOVIE_COMPLETED": {
      return{
          ...state,
          imageMovie: action.payload[0].posters[0]
      }
    }
    case "CLEAR_MOVIES":{
      return state = []
    }
    
    default: {
		return state;
	}
  }
}

export default movieReducer;
