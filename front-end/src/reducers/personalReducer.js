

const initialState = {
    infUser:{},
    productDataUser:[],
    UpdatePublish:{}
}

export default function personalReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_DATA_PER': {
            return {
                ...state,
                productDataUser:action.payload
            }
        }
        case 'GET_INF_USER': {
            return {
                ...state,
                infUser:action.payload
            }
        }
        case 'RESET_STATE_PERSONAL_PRODUCT': {
            return {
                ...state,
                productDataUser:action.payload
            }
        }
        case 'UPDATE_PUBLISH': {
            return {
                ...state,
                UpdatePublish:action.payload
            }
        }
        case 'RESET_UPDATE_PUBLIST': {
            return {
                ...state,
                UpdatePublish:{}
            }
        }
        default:
            return state
    }
}


