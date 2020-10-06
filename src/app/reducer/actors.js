/* eslint-disable default-case */
const initialState = {
  actors: []
}

const actorsReducer = (state=initialState,action) => {
  switch(action.type){
    case "GET_ALL_ACTORS_COMPLETED":{
        return{
          ...state,
          actors: action.payload[0].results
        }
    }
    default: {
		return state;
	}
  }
}

export default actorsReducer;
