import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import '../css/homeStyle.css'
import { useSelector, useDispatch } from 'react-redux'
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Spin, Card, Row, Col, Button, Space, InputNumber, message, Form, Input, Select, Typography, Upload } from 'antd';
import Address from './address';
import { insertProduct } from '../actions/postPageActions'
import { notificationController } from '../utils/notify'
function PostPage() {
    const dispatch = useDispatch()
    const rsCate = useSelector(state => state.cate.allCate.data);
    const postPage = useSelector(state => state.postPage);
    const [isShowDialogAddress, setIsShowDialogAddress] = useState(false)
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState();
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const { Title } = Typography;
    const { Option } = Select;

    const details = {
        gd_nt_cc: ['Tình Trạng', 'Loại Sản Phẩm'],
        dt: ['Hãng', 'Dòng Máy', 'Tình Trạng', 'Xuất Xứ', 'RAM', 'Ổ Cứng'],
        da_tp_oth: ['Kích Thước', 'Năm Sản Xuất'],
        me_be: ['Xuất Sứ', 'Tình Trạng'],
        tt_dcn: ['Tình Trạng'],
        gt_tt: ['Xuất Sứ', 'Tình Trạng'],
        vp_cnn: ['Tình Trạng'],
        tl_ml_mg: ['Tình Trạng', 'Năm Sản Xuất', 'Hãng', 'Công Suất']
    };
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    var data = rsCate.map(el => {
        return {
            value: el.cateCd,
            label: el.cateNm
        }
    })
    const handleChange = () => {
        form.setFieldsValue({
            details: [],
        });
    };
    useEffect(() => {
        if (postPage != null) {
            if (postPage.success) {
                form.resetFields();
                setFileList(null)
                dispatch({ type: 'product/insertData', payload: null })
                notificationController.success(postPage.message)
                setLoading(false)
            }
        }
        setLoading(false)
    }, [postPage]);
    const submitDataEvent = (value) => {
        setLoading(true)
        if(fileList == undefined){
            message.error("Vui lòng thêm hình ảnh.")
            setLoading(false)
            return
        }
        if (fileList.length == 0 ) {
            message.error("Vui lòng thêm hình ảnh.")
            setLoading(false)
            return
        }
        var formData = new FormData();
        var lisFile = new Array();
        var details = '';
        for (let i = 0; i < value.detailsProduct.length; i++) {
            details += value.detailsProduct[i].name + ':' + value.detailsProduct[i].desc + ';'
        }
        value.details = details
        lisFile.push(fileList[0].originFileObj)
        for (let i = 0; i < fileList.length; i++) {
            formData.append('images', fileList[i].originFileObj)
        }

        var postData = JSON.stringify(value);
        formData.append('data', postData)
        dispatch(insertProduct(formData))
    }
    const onClose = () => {
        setIsShowDialogAddress(false)
    }
    const dataInAddree = (data) => {
        form.setFieldsValue({
            addr: data
        });
    };
    const handleChangeImage = ({ fileList: newFileList }) => setFileList(newFileList);
    const openPopupAddress = () => {
        setIsShowDialogAddress(true)
    };
    return (
        <>
            <div className='container'>
                <Spin spinning={loading}>
                    <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: '10px', marginBottom: "10px" }}>
                        <Card>
                            <Row >
                                <Col xs={22} sm={24} md={24} lg={18} xl={18} align="middle" style={{ Align: "center" }}>
                                    <Form
                                        onFinish={submitDataEvent}
                                        labelCol={{ span: 4 }}
                                        form={form}
                                        layout="horizontal"
                                        name="control-hooks"
                                    >
                                        <Title level={3}>Thêm Sản Phẩm Mới</Title>

                                        <Form.Item
                                            label="Loại Sản Phẩm"
                                            name="cateCd"
                                            rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm' }]}
                                        >
                                            <Select placeholder="Please select a category" options={data} onChange={handleChange} >
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Tên Sản Phẩm"
                                            name="name"
                                            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                                        >
                                            <Input onInput={e => e.target.value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)} />
                                        </Form.Item>

                                        <Form.Item
                                            label="Price"
                                            name="price"
                                            rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}
                                        >
                                            <InputNumber style={{ width: '100%' }}
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="Mô Tả"
                                            name="desc"

                                            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                                        >
                                            <TextArea onInput={e => e.target.value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)} rows={7} placeholder="Mô tả sản phẩm &#10;Mô tả chi tiết một số đặc điểm của sản phẩm:  &#10;- Sản phẩm: Tên, số lượng, thương hiệu, xuất xứ  &#10;- Thời gian sử dụng  &#10;- Chấp nhận thanh toán  &#10;- Chính sách bảo hành bảo trì" />
                                        </Form.Item>
                                        <Form.Item
                                            label="Thông Tin Chi Tiết" rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}>
                                            <Form.List name="detailsProduct">
                                                {(fields, { add, remove }) => (
                                                    <>
                                                        {fields.map((field) => (
                                                            <Space key={field.key} align="baseline">
                                                                <Form.Item
                                                                    noStyle
                                                                    shouldUpdate={(prevValues, curValues) =>
                                                                        prevValues.area !== curValues.area || prevValues.details !== curValues.details
                                                                    }
                                                                >
                                                                    {() => (
                                                                        <Form.Item
                                                                            {...field}
                                                                            name={[field.name, 'name']}
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    message: 'Missing name',
                                                                                },
                                                                            ]}
                                                                        >
                                                                            <Select
                                                                                disabled={!form.getFieldValue('cateCd')}
                                                                                style={{
                                                                                    width: 130,
                                                                                }}
                                                                            >
                                                                                {(details[form.getFieldValue('cateCd')] || []).map((item) => (
                                                                                    <Option key={item} value={item}>
                                                                                        {item}
                                                                                    </Option>
                                                                                ))}
                                                                            </Select>
                                                                        </Form.Item>
                                                                    )}
                                                                </Form.Item>
                                                                <Form.Item
                                                                    {...field}
                                                                    // label="Mô Tả"
                                                                    name={[field.name, 'desc']}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: 'Missing Desc',
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input />
                                                                </Form.Item>

                                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                                            </Space>
                                                        ))}

                                                        <Form.Item>
                                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                                Thêm Thông Tin
                                                            </Button>
                                                        </Form.Item>
                                                    </>
                                                )}
                                            </Form.List>
                                        </Form.Item>
                                        {/* <Row >
                                            <Col xs={22} sm={18} md={18} lg={18} xl={20}>
                                                <Form.Item
                                                    name="addr"
                                                    label="Địa Chỉ"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng nhập địa chỉ',
                                                        },
                                                    ]}
                                                >
                                                    <Input disabled />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={4} sm={2} md={2} lg={3} xl={4}>
                                                <Form.Item>
                                                    <Button type="link" onClick={openPopupAddress}>
                                                        Thêm địa chỉ
                                                    </Button>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Address isShow={isShowDialogAddress} setIshow={onClose} submitAddresss={dataInAddree} /> */}
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                Đăng Bài
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col xs={24} sm={10} md={8} lg={4} xl={6} align="middle" style={{ Align: "center" }}>
                                    <Title level={5}>Thêm Hình Ảnh</Title>
                                    <Form
                                        labelCol={{ span: 4 }}
                                        layout="horizontal"
                                        style={{ maxWidth: 600, marginTop: 8 }}
                                    >
                                        <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
                                            <Upload multiple={true} accept="image/*"
                                                listType="picture-card"
                                                fileList={fileList}
                                                beforeUpload={() => false}
                                                className="image-uploader"
                                                maxCount={5}
                                                onChange={handleChangeImage}>
                                                <div>
                                                    <UploadOutlined />
                                                    <div style={{ marginTop: 8 }}>Upload</div>
                                                </div>
                                            </Upload>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                        </Card>
                    </Space>
                </Spin>
            </div>
        </>
    )
}

export default PostPage;