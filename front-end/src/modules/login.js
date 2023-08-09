import { Button, Spin, Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import '../css/login.css'
import Regis from './regis'
import { login } from '../actions/loginAction'
import { useSelector, useDispatch } from 'react-redux'
import Service from '../service';
import axios from 'axios';

const Login = ({ isShow, setIshow }) => {
    const dispatch = useDispatch()
    const loginToken = useSelector(state => state.login.token);
    const loginFail = useSelector(state => state.login.failToLogin);
    const [loading, setLoading] = useState(false);
    const [isShowDialogRegis, setIsShowDialogRegis] = useState(false)
    const [showMes, setShowMess] = useState(false)
    useEffect(() => {
        setLoading(false)
        dispatch({ type: 'LOGIN_FAIL', payload: {} })
        setShowMess(false)
        axios.defaults.headers.common['Authorization'] = `Bearer ${loginToken}`;
        Service.setToken(loginToken)
    }, [loginToken]);


    useEffect(() => {
        setLoading(false)
        setShowMess(true)
    }, [loginFail]);

    const hideLogin = () => {
        setIshow(false);
    };
    const onClose = () => {
        setIsShowDialogRegis(false)
    }
    const openPopupRegis = () => {
        setIsShowDialogRegis(true)
    };
    const handleLogin = (e) => {
        setLoading(true)
        // var param = {
        //     "login": "giapham123@gmail.com",
        //     "password": "giapham123"
        // }
        dispatch(login(e))
    }
    return (
        <div >
            <Spin spinning={loading}>
                <Modal
                    title="Đăng nhập"
                    open={isShow}
                    onCancel={hideLogin}
                    footer={null}
                >
                    <Form
                        name="regis-form"
                        onFinish={handleLogin}
                    >
                        <Form.Item
                            name="login"
                            rules={[{ required: true, message: 'Please enter your login' }]}
                        >
                            <Input placeholder="login" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password' }]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                        {showMes == true ?
                            <div style={{ color: 'red' }}>{loginFail.message}</div>
                            : null}
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Đăng nhập
                            </Button>
                            <Button type="default" htmlType="button" style={{ marginLeft: "5px" }} onClick={openPopupRegis}>
                                Đăng ký
                            </Button>
                        </Form.Item>

                    </Form>
                </Modal>
                <Regis isShowRegis={isShowDialogRegis} setIshowRegis={onClose} />
            </Spin>
        </div>
    )
};
export default Login;
