const initialState = []

const scoreReducer = (state=initialState,action) =>{
    switch(action.type){
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
