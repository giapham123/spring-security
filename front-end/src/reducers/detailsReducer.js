

const initialState = {
    productData:{},
    relatedData:[]
}

export default function detailsReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DETAILS_DATA': {
            return {
                ...state,
                productData:action.payload
            }
        }
        case 'GET_RELATED_DATA': {
            return {
                ...state,
                relatedData:action.payload
            }
        }
        default:
            return state
    }
}


