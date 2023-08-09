import { Button, Form, Input, Modal, InputNumber, Typography, Select, Upload, Space, Col, Row } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import '../css/login.css'
import Address from './address';
import {insertUserShop} from '../actions/regis'
import { useSelector, useDispatch } from 'react-redux'

const Regis = ({ isShowRegis, setIshowRegis }) => {
    const dispatch = useDispatch()
    const { TextArea } = Input;
    const [fileList, setFileList] = useState();
    const [isShowDialogAddress, setIsShowDialogAddress] = useState(false)
    const [form] = Form.useForm();
    const { Title } = Typography;
    const { Option } = Select;
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const handleChangeImage = ({ fileList: newFileList }) => setFileList(newFileList);
    const hideLogin = () => {
        setIshowRegis(false);
    };
    const openPopupAddress = () => {
        setIsShowDialogAddress(true)
    };
    const onClose = () => {
        setIsShowDialogAddress(false)
    }
    const dataInAddree = (data) => {
        console.log(data)
        form.setFieldsValue({
            addr: data
        });
    };
    const submitDataEvent = (value) => {
        if (fileList.length == 0) {
            // message.error("Vui lòng thêm hình ảnh.")
            return
        }
        var formData = new FormData();
        var lisFile = new Array();
        lisFile.push(fileList[0].originFileObj)
        for (let i = 0; i < fileList.length; i++) {
            formData.append('images', fileList[i].originFileObj)
        }

        var postData = JSON.stringify(value);
        formData.append('data', postData)
        dispatch(insertUserShop(formData))
        console.log(value,  fileList)
    }
    return (
        <div >
            <Modal
                title="Đăng ký tài khoản"
                open={isShowRegis}
                onCancel={hideLogin}
                footer={null}
            >
                <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: "10px" }}>

                    <Form
                        name="login-form"
                        onFinish={submitDataEvent}
                        form={form}
                        layout="vertical"
                    >
                        <Title level={5}>Thêm Hình Ảnh</Title>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} align="middle" style={{ Align: "center" }}>
                            <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
                                <Upload multiple={true} accept="image/*"
                                    listType="picture-card"
                                    fileList={fileList}
                                    beforeUpload={() => false}
                                    className="image-uploader"
                                    maxCount={1}
                                onChange={handleChangeImage}
                                >
                                    <div>
                                        <UploadOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} align="middle" style={{ Align: "center" }}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Mật Khẩu"
                                name="pwd"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label="Tên Shop"
                                name="shopNm"
                                rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                            >
                                <InputNumber style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Mô Tả Shop"
                                name="desc"
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                            >
                                <TextArea onInput={e => e.target.value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)} rows={7} placeholder="Mô tả" />
                            </Form.Item>
                            <Form.Item
                                label="Địa Chỉ"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập địa chỉ',
                                    },
                                ]}

                            >
                                <Form.Item name="addr" style={{ display: 'inline-block', width: 'calc(80%)' }}>
                                    <Input disabled style={{ width: "100%" }} />
                                </Form.Item>
                                <Form.Item
                                    style={{ display: 'inline-block', width: 'calc(20% - 12px)' }}
                                >
                                    <Button type="link" onClick={openPopupAddress}>
                                        Địa Chỉ
                                    </Button>
                                </Form.Item>


                                <Address isShow={isShowDialogAddress} setIshow={onClose} submitAddresss={dataInAddree} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Đăng ký
                                </Button>
                            </Form.Item>
                        </Col>
                    </Form>
                </Space>
            </Modal>
        </div>
    )
};
export default Regis;