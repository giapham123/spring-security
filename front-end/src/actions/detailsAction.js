import Service from '../service';

const service = new Service;
export function getDetailsProduct(param) {
    return async function getDetailsProduct(dispatch) {
        const response = await service.get('/view/detail-product/'+param)
        dispatch({ type: 'GET_DETAILS_DATA', payload: response.data.data.productData })
        dispatch({ type: 'GET_RELATED_DATA', payload: response.data.data.related })
    }
}
