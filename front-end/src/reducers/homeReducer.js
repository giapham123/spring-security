

const initialState = {
    allCate:[],
    allDataHome: []
}

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case 'cate/AllCate': {
            return {
                ...state,
                allCate:action.payload
            }
        }
        case 'cate/NewestProduct': {
            return {
                ...state,
                allDataHome:action.payload
            }
        }
        default:
            return state
    }
}


