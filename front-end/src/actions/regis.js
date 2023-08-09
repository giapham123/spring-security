import Service from '../service';

const service = new Service;
export function insertUserShop(param) {
    return async function insertUserShop(dispatch) {
        const response = await service.post('/save-user-info', param)
        console.log(response)
    }
}


