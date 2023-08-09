

const initialState = {
}

export default function totalDataReducer(state = initialState, action) {
    switch (action.type) {
        case 'TOTAL_DATA': {
            return action.payload
        }
        default:
            return state
    }
}


