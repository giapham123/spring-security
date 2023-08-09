import Service from '../service';

const service = new Service;
export function getPersonalProduct(param) {
    return async function getPersonalProduct(dispatch) {
        // dispatch({ type: 'RESET_STATE_PERSONAL_PRODUCT' })
        const response = await service.get('/view/show-data-user/'+param.path +  "/"+ param.edit)
        dispatch({ type: 'GET_INF_USER', payload: response.data.data })
    }
}

export function getPersonalProductPage(param) {
    return async function getPersonalProductPage(dispatch) {
        // dispatch({ type: 'RESET_STATE_PERSONAL_PRODUCT' })
        const response = await service.get('/view/show-data-user/'+param.path + '/' + param.page +"/"+ param.edit)
        dispatch({ type: 'GET_ALL_DATA_PER', payload: response.data.data })
    }
}
