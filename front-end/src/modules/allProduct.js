import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import '../css/homeStyle.css'
import { Card, Button, List, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { showAllProductViaCategory, getTotalData } from '../actions/showAllProducts'
import moment from 'moment/moment';
import 'moment/locale/vi'
var count = 1;
function AllProduct() {
    const dispatch = useDispatch()
    const { pathname } = window.location
    const { Meta } = Card;
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [title, setTitle] = useState();
    const rsProduct = useSelector(state => state.allProduct.data);
    const rsCate = useSelector(state => state.cate.allCate.data);
    const rsTotalData = useSelector(state => state.totalData);
    var titleCate = rsCate.find(el => el.cateCd == pathname.split('/')[2]).cateNm
    useEffect(() => {
        setList(rsProduct);
    }, [rsProduct]);
    useEffect(() => {
        if (count != 1) {
            setLoading(true);
            setList(
                list.concat([...new Array(3)].map(() => ({
                    productId: null,
                    name: null,
                    price: null,
                    desc: null,
                    addr: null,
                    details: null,
                    cateId: null,
                    creDt: null,
                    updDt: null,
                    userId: null,
                    images: null,
                    image: null,
                    loading: true
                }
                ),
                )));
            setTimeout(() => {
                setList(
                    list.concat(rsProduct),
                );
                window.dispatchEvent(new Event('resize'));
                setLoading(false);
            }, 1000);
        }
    }, [count]);
    useEffect(() => {
        count = 1
        setList([])
        setInitLoading(false);
        var param = {
            path: pathname.split('/')[2],
            page: 0,
            edit: 1
        }
        var paramCount = {
            cateCd: pathname.split('/')[2],
            userId: 0,
            edit: 1
        }
        dispatch(showAllProductViaCategory(param))
        dispatch(getTotalData(paramCount))
        setTitle(titleCate)
    }, [pathname]);

    const onLoadMore = () => {
        var param = {
            path: pathname.split('/')[2],
            page: count++,
            userId: 0,
            edit: 1
        }
        dispatch(showAllProductViaCategory(param))
        if (count == 1) {
            setLoading(true);
            setList(
                list.concat([...new Array(3)].map(() => ({
                    productId: null,
                    name: null,
                    price: null,
                    desc: null,
                    addr: null,
                    details: null,
                    cateId: null,
                    creDt: null,
                    updDt: null,
                    userId: null,
                    images: null,
                    image: null,
                    loading: true
                }
                ),
                )));

            setTimeout(() => {
                setList(
                    list.concat(rsProduct),
                );
                window.dispatchEvent(new Event('resize'));
                setLoading(false);
            }, 1000);
        }
    };
    const loadMore = list.length >= rsTotalData ? null :
        list.length != 0 && !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null;


    return (
        <>
            <div className='container' style={{ paddingTop: "10px" }}>
                <Card title={title}>
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
                        className="demo-loadmore-list"
                        loading={initLoading}
                        itemLayout="horizontal"
                        loadMore={loadMore}
                        dataSource={list}
                        renderItem={(item, index) => (
                            <Link to={{
                                pathname: `/details/${item.productId}`
                            }} >
                                <List.Item key={index}>
                                    <Skeleton avatar title={false} loading={item.loading} active>
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
                                            )} vnd</div>} description={item.addr == null ? null : moment(item.updDt).startOf('minutes').fromNow().charAt(0).toUpperCase() + moment(item.updDt).startOf('minutes').fromNow().slice(1) + " " + item.addr.split([";"])[2]} />
                                        </Card>
                                    </Skeleton>
                                </List.Item>
                            </Link>
                        )}
                    />
                </Card>
            </div>
        </>
    )
}
const win = Dimensions.get('window');
const mystyle = {
    width: '100%',
    height: win.height / 2
};

export default AllProduct;