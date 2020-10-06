const initialState = {
    score: 0,
    highScore: 0
}

const scoreReducer = (state=initialState,action) =>{
    switch(action.type){
        case "GET_SCORE": {
            return {
                ...state
            }
        }   
        case "UPDATE_SCORE": {
            return{
                ...state,
                score: action.payload,
                status:'updateScore'
            }
        }
        case "UPDATE_HIGHEST_SCORE": {
            return{
                ...state,
                highScore: action.payload,
                status:'updateHighscore'
            }
        }
        case "CLEAR_SCORE": {
            return state = [];
        }
        default: {
            return state
        }
    }
}

export default scoreReducer;
