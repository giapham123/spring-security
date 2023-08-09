

const initialState = []

export default function postPageReducer(state = initialState, action) {
    switch (action.type) {
        case 'product/insertData': {
            return action.payload
        }
        default:
            return state
    }
}


