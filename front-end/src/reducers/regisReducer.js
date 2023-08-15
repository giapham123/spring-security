
const initialState = []

export default function regisReducer(state = initialState, action) {
    switch (action.type) {
        case 'REGIS_ACC': {
            return action.payload
        }
        default:
            return state
    }
}
