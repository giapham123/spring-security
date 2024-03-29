import Service from '../service';
import axios from 'axios';
const service = new Service;
export function login(param) {
    return async function login(dispatch) {
        try {
            const response = await service.post('/authenticate', param)
            const rsUsrDetail = await service.get('/user-detail', { email: param.login })
            dispatch({ type: 'USR_INF', payload: rsUsrDetail.data.data })
            dispatch({ type: 'TOKEN', payload: response.data })
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
            Service.setToken(response.data)
            localStorage.setItem("token", response.data)
        } catch (err) {
            dispatch({
                type: 'LOGIN_FAIL', payload: {
                    message: "Sai tên đăng nhập hoặc mật khẩu."
                }
            })
        }
    }
}
