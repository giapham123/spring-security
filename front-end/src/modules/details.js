import { Col, Row, Avatar, List, Button, Card, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { CloseSquareOutlined } from '@ant-design/icons';
import '../css/homeStyle.css'
import '../css/detailsStyle.css'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import { getDetailsProduct } from '../actions/detailsAction'
import { useSelector, useDispatch } from 'react-redux'
import { Text, View } from "react-native";
const Details = () => {
    const { pathname } = window.location
    const dispatch = useDispatch()
    const { Meta } = Card;
    const rsDetailsProduct = useSelector(state => state.detailsProduct.productData);
    const rsRelated = useSelector(state => state.detailsProduct.relatedData);
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true);
    const [productInf, setProductInf] = useState({})
    const [details, setDetails] = useState([])

    useEffect(() => {
        setLoading(true)
        setDetails([])
        setImages([])
        setProductInf({})
        dispatch(getDetailsProduct(pathname.split('/')[2]))
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [pathname]);
    useEffect(() => {
        setLoading(false)
        setDetails([])
        setImages([])
        setProductInf({})
        if (images.length == 0) {
            setImages(rsDetailsProduct.images)
            setProductInf(rsDetailsProduct)
            var arrDetails = []
            for (let i = 0; i < rsDetailsProduct.details.split(';').length - 1; i++) {
                arrDetails.push({
                    key: rsDetailsProduct.details.split(';')[i].split(':')[0],
                    value: rsDetailsProduct.details.split(';')[i].split(':')[1]
                })
            }
            setDetails(arrDetails)
        }
    }, [rsDetailsProduct]);

    return (
        <div className='container'>
            <Spin spinning={loading}>
                <Row >
                    <Col xs={22} sm={12} md={12} lg={12} xl={10} >
                        <Carousel autoPlay>
                            {images.map((item, index) => (<div key={index} style={{ height: "450px" }}>
                                <img src={item} style={{ height: "100%", width: "100%", objectFit: 'contain' }} />
                            </div>))}
                        </Carousel>
                    </Col>
                    <Col xs={22} sm={12} md={12} lg={12} xl={14} align="middle" style={{ textAlign: "left", paddingLeft: "50px" }}>
                        <List
                            itemLayout="vertical"
                            size="large"
                        >
                            <List.Item
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={productInf.imageShop} />}
                                    title={<a href={"/personal-page/" + productInf.userId}>{productInf.shopNm}</a>}
                                // description={productInf.descShop}
                                />
                                <Row>
                                    <Col align="middle" style={{ textAlign: "center", paddingBottom: "10px" }}>
                                        <b>{productInf.name}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col align="middle" style={{ textAlign: "center", paddingBottom: "10px", color: '#B70404' }}>
                                        <b>Giá: {String(productInf.price).replace(
                                            /(\d)(?=(?:\d{3})+(?:\.|$))/g,
                                            '$1,'
                                        )} vnd</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col align="middle" style={{ textAlign: "left", paddingBottom: "10px" }}>
                                        <b> Địa Chỉ:</b> {productInf.addr}
                                    </Col>
                                </Row>
                                <List>
                                    <Row >
                                        {
                                            details.map((listitem, index) => {
                                                return (<Col span={8} key={index}>
                                                    <List.Item.Meta
                                                        avatar={
                                                            <CloseSquareOutlined />
                                                        }
                                                        title={listitem.key}
                                                        description={listitem.value}
                                                    />
                                                </Col>)
                                            })
                                        }
                                    </Row>
                                </List>


                                <Row>
                                    <Col span={9} align="middle" style={{ textAlign: "center", paddingBottom: "10px" }}>
                                        <Button style={{ width: "200px" }}>09312345*** Bấm Để Hiện</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col align="middle" style={{ textAlign: "left", paddingBottom: "10px" }}>
                                        <b>Mô Tả</b> <br />
                                        <Text>{productInf.desc}</Text>
                                    </Col>
                                </Row>
                            </List.Item>

                        </List>
                    </Col>
                </Row>
                <div className='container'>
                    <Card title="Các Sản Phẩm Liên Quan" extra={<a href={`/all-product/gd_nt_cc`}>Tất Cả Sản Phẩm</a>}>
                        <List
                            grid={{
                                gutter: 16,
                                xs: 2,
                                sm: 2,
                                md: 4,
                                lg: 4,
                                xl: 5,
                                xxl: 3,
                            }}
                            dataSource={rsRelated}
                            renderItem={(item, index) => (
                                <Link to={{
                                    pathname: `/details/${item.productId}`
                                }}>
                                    <List.Item key={index}>
                                        <Card
                                            // style={{ height: 300 }}
                                            hoverable
                                            cover={<img width={272} height={200}
                                                alt="logo" src={item.image} />}
                                        >
                                            <Meta className='styleMeta' title={item.name} />
                                            <List.Item.Meta title={<div style={{ color: '#B70404' }}>{String(item.price).replace(
                                                /(\d)(?=(?:\d{3})+(?:\.|$))/g,
                                                '$1,'
                                            )} vnd</div>} description={item.addr == null ? null : item.addr.split([";"])[2]} />
                                        </Card>
                                    </List.Item>
                                </Link>
                            )}
                        />
                    </Card>
                </div>
            </Spin>
        </div>
    )
};
export default Details;