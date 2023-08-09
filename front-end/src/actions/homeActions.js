import Service from '../service';
// Thunk function
const service = new Service;
export function getAllCate() {
    return async function getAllCate(dispatch) {
        const response = await service.get('/view/get-all-category')
        dispatch({ type: 'cate/AllCate', payload: response.data })
    }
}

export function getNewestProduct() {
    return async function getNewestProduct(dispatch) {
        const response = await service.get('/view/newest-product')
        dispatch({ type: 'cate/NewestProduct', payload: response.data })
    }
}