import Service from '../service';
// Thunk function
const service = new Service;
export function showAllProductViaCategory(param) {
    return async function showAllProductViaCategory(dispatch) {
        // dispatch({ type: 'RESET_STATE_ALLPRODUCT',payload: [] })
        const response = await service.get('/view/show-data-category/'+param.path + '/' + param.page + '/' + param.edit)
        dispatch({ type: 'allProduct/getAllProduct', payload: response.data })
    }
}

export function getTotalData(param) {
    return async function getTotalData(dispatch) {
        const response = await service.get('/view/total-data', param)
        dispatch({ type: 'TOTAL_DATA', payload: response.data.data })
    }
}
