const initialState = {
    status: "game"
}

const playerReducer = (state=initialState,action) =>{
    switch(action.type){
        case "UPDATE_STATUS_PLAYER": {
            return {
                ...state,
                status: action.payload
            }
        }   
        default: {
            return state
        }
    }
}

export default playerReducer;
