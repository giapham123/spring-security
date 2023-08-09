

const initialState = []

export default function allProductReducer(state = initialState, action) {
    switch (action.type) {
        case 'allProduct/getAllProduct': {
            return action.payload
        }
        case 'RESET_STATE_ALLPRODUCT': {
            return state
        }
        default:
            return state
    }
}


