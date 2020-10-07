/* eslint-disable default-case */
const initialState = {
  movies: []
}

const moviesReducer = (state=initialState,action) => {
  switch(action.type){
    case "GET_ALL_MOVIES_COMPLETED":{
        return{
            ...state,
            movies: action.payload[0].results,
            statue: "complete"
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

export default moviesReducer;
