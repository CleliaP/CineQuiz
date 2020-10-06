const initialState = 0

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
                status:'update'
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
