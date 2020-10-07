const initialState = {
  actor: []
}
const actorReducer = (state=initialState,action) => {
  switch(action.type){
    case "GET_DETAIL_ACTOR_COMPLETED":{
        return{
            ...state,
            actor: action.payload[0],
            status:'complete'
        }
    }
    case "GET_DETAIL_ACTOR_ERROR": {
        return state = {
            ...state,
            status: 'failed'
        }
    }
    case "GET_IMAGE_ACTOR_COMPLETED": {
        return{
            ...state,
            imageActor: action.payload[0].profiles[0].file_path,
            status:'complete'
        }
    }
    case "GET_MOVIES_ACTOR_COMPLETED": {
      return{
        ...state,
        moviesActor: action.payload[0].cast,
        status:'complete'
      }
    }
    case "CLEAR_ACTOR":{
      return state = []
    }

    default: {
		return state;
	}
  }
}

export default actorReducer;
