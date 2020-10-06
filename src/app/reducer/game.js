const initialState = {}

const gameReducer = (state=initialState,action) =>{
    switch(action.type){
        case "START_NEW_GAME":{
            return state = {
                type: action.payload.type
            }
        }
        default:
            return state
    }
}

export default gameReducer;
