import React, { useState } from 'react';
import { Input, Modal, AutoComplete, Form, Select } from 'antd';

const Address = ({ isShow, setIshow, submitAddresss }) => {
    const proviceData = [
        'Dak Lak',
    ];
    const districtData = [
        'Krông Ana',
        'Ea Kar',
        'Krông Búk',
        'MDắk',
        'Ea HLeo',
        'Cư MGar',
        'Buôn Đôn',
        'Ea Súp',
        'Krông Bông',
        'Krông Năng',
        'Lắk',
        'Krông Pắc',
        'Cư Kuin',
        'Thành phố Buôn Ma Thuột'];
    const cityData = {
        'Krông Ana': ['Băng Adrênh', 'Bình Hòa', 'Dray Sáp', 'Dur Kmăl', 'Ea Bông', 'Ea Na', 'Quảng Điền'],
        'Ea Kar': ['Cư Huê', 'Ea Tíh', 'Cư Yang', 'Cư Bông', 'Ea Đar', 'Ea Sô', 'Xuân Phú', 'Ea Păl', 'Cư Ni', 'Ea Ô', 'Ea Kmút', 'Cư Prông', 'Cư Elang', 'Ea Sar', 'Thị trấn Ea Kar', 'Thị trấn Ea K Nốp'],
        'Krông Búk': ['Cu Nê', 'Ea TuL', 'Ea Rơng', 'Thống Nhất', 'Ea Hô', 'Cu Bao', 'Cuôr Đăng', 'Bình Thuận', 'Phú Xuân', 'Phú Lộc', 'Cu Pông', 'Krông Năng', 'Pông Drang', 'Đoàn Kết', 'Dliê Ya', 'Tam Giang'],
        'MDắk': ['CưMta', 'CưSan', 'CưKroá', 'CưPrao', 'EaMlây', 'EaMĐoal', 'EaRiêng', 'EaTrang', 'EaPil', 'EaLai', 'Krông Á', 'Krông Jing', 'Thị trấn  MDrắk'],
        'Ea HLeo': ['Cư A Mung', 'Cư Mốt', 'Ea Hiao', 'Ea Hleo', 'Ea Khal', 'Ea Nam', 'Ea Ral', 'Ea Sol', 'Ea Tir', 'Ea Wy', 'Dliê Yang', 'Thị trấn Ea Drăng'],
        'Cư MGar': ['Cư Dliê Mnông', 'Cư Mgar', 'Cư Suê', 'Cuôr Đăng', 'Ea Drơng', 'Ea Hđing', 'Ea Kiết', 'Ea Kpam', 'Ea Kuếh', 'Ea MDroh', 'Ea Mnang', 'Ea Tar', 'Ea Tul', 'Quảng Hiệp', 'Quảng Tiến', 'Thị trấn Quảng Phú', 'Thị trấn Ea Pốk'],
        'Buôn Đôn': ['Cuôr Knia', 'Ea Bar', 'Ea Huar', 'Ea Nuôl', 'Ea Wer', 'Krông Na', 'Tân Hòa'],
        'Ea Súp': ['Cuôr Knia', 'Ea Bar', 'Ea Bung', 'Ea Huar', 'Ea Lê', 'Ea Nuôl', 'Ea Rốk', 'Ea Súp', 'Ea Wer', 'Krông Na'],
        'Krông Bông': ['Thị trấn Krông Kmar', 'Yang Reh', 'Ea Trul', 'Hòa Sơn', 'Khuê Ngọc Điền', 'Hòa Tân', 'Cư Kty', 'Hòa Thành', 'Dang Kang', 'Hòa Lễ', 'Hòa Phong', 'Cư Pui', 'Cư Đrăm', 'Yang Mao'],
        'Krông Năng': ['Thị trấn Krông Năng', 'Cư Klông', 'Dliê Ya', 'Ea Dăh', 'Ea Hồ', 'Ea Puk', 'Ea Tam', 'Ea Tân', 'Ea Tóh', 'Phú Lộc', 'Phú Xuân', 'Tam Giang'],
        'Lắk': ['Thị trấn Liên Sơn', 'Bông Krang', 'Buôn Tría', 'Buôn Triết', 'Đắk Liêng', 'Đắk Nuê', 'Đắk Phơi', 'Ea Rbin', 'Krông Nô', 'Nam Ka', 'Yang Tao'],
        'Krông Pắc': [' Thị trấn Phước An', 'Ea Hiu', 'Ea Kênh', 'Ea Kly', 'Ea Knuếc', 'Ea Kuăng', 'Ea Phê', 'Ea Uy', 'Ea Yiêng', 'Ea Yông', 'Hòa An', 'Hòa Đông', 'Hòa Tiến', 'Krông Búk', 'Tân Tiến', 'Vụ Bổn'],
        'Cư Kuin': ['Dray Bhăng', 'Ea Bhôk', 'Ea Hu', 'Ea Ktur', 'Ea Ning', 'Ea Tiêu', 'Hòa Hiệp', 'Cư Êwi'],
        'Thành phố Buôn Ma Thuột': ['Ea Tam', 'Khánh Xuân', 'Tân An', 'Tân Hòa', 'Tân Lập', 'Tân Lợi', 'Tân Thành', 'Tân Tiến', 'Thắng Lợi', 'Thành Công', 'Thành Nhất', 'Thống Nhất', 'Tự An', 'Cư Êbur', 'Ea Kao', 'Ea Tu', 'Hòa Khánh', 'Hòa Phú', 'Hòa Thắng', 'Hòa Thuận', 'Hòa Xuân']
    };
    const [form] = Form.useForm();

    const province = Form.useWatch('province', form);
    const district = Form.useWatch('district', form);
    const street = Form.useWatch('street', form);
    const detailsAdd = Form.useWatch('detailsAdd', form);
    const submitDataEvent = () => {
        submitAddresss(detailsAdd + '; Phường: ' + street + '; Huyện: ' + district + '; Tỉnh: Dak Lak');
        setIshow(false)
    }
    const [cities, setCities] = useState(cityData[districtData[0]]);
    const [secondCity, setSecondCity] = useState(cityData[districtData[0]][0]);
    const handleProvinceChange = (value) => {
        setCities(cityData[value]);
        setSecondCity(cityData[value][0]);
    };
    const onSecondCityChange = (value) => {
        setSecondCity(value);
    };
    return (
        <div>
            <Modal
                title="Địa Chỉ"
                open={isShow}
                onCancel={() => setIshow()}
                onOk={submitDataEvent}
                htmlType="submit"
            >
                <Form
                    name="wrap"
                    labelCol={{ flex: '110px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 4 }}
                    colon={false}
                    form={form}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item
                        label="Tỉnh, Thành Phố"
                        name="province"
                        initialValue='Dak Lak'
                        rules={[{ required: true, message: 'Vui lòng chọn tỉnh, thành phố' }]}
                    >
                        <Select
                            // defaultValue={proviceData[0]}
                            disabled
                            options={proviceData.map((province) => ({
                                label: province,
                                value: province,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Quận, Huyện"
                        name="district"
                        rules={[{ required: true, message: 'Vui lòng chọn quận, huyện' }]}
                    >
                        <Select
                            style={{ width: '100%', paddingTop: '10px' }}
                            // defaultValue={districtData[0]}
                            onChange={handleProvinceChange}

                            options={districtData.map((province) => ({
                                label: province,
                                value: province,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Phường, Xã, Thị Trấn"
                        name="street"
                        rules={[{ required: true, message: 'Vui lòng chọn phường, xã, thị trấn' }]}
                    >
                        <Select
                            style={{ width: '100%', paddingTop: '10px' }}
                            value={secondCity}
                            onChange={onSecondCityChange}
                            options={cities.map((city) => ({
                                label: city,
                                value: city,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Địa Chỉ Cụ Thể"
                        name="detailsAdd"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cụ thể' }]}
                    >
                        <Input onInput={e => e.target.value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Address;