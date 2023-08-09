import Service from '../service';

const service = new Service;
export function insertProduct(param) {
    return async function insertProduct(dispatch) {
        const response = await service.post('/admin/insert-product', param)
        dispatch({ type: 'product/insertData', payload: response.data })
    }
}

export function deleteProduct(param) {
    return async function deleteProduct(dispatch) {
        const response = await service.get('/admin/delete-product', param)
        // dispatch({ type: 'product/insertData', payload: response.data })
    }
}

export function publishProduct(param) {
    return async function publishProduct(dispatch) {
        const response = await service.get('/admin/publish-product', param)
        dispatch({ type: 'UPDATE_PUBLISH', payload: response.data })
    }
}

