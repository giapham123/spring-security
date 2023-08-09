import { UnorderedListOutlined, HomeOutlined, MenuOutlined, LoginOutlined, PlusSquareOutlined,MenuFoldOutlined, UserOutlined,LogoutOutlined } from '@ant-design/icons';
import { Menu, Input, Col, Button, Space, Row, Avatar, Dropdown } from 'antd';
import { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Home from './home';
import AllProduct from './allProduct';
import Details from './details';
import PersonalPage from './personalPage';
import PostPage from './postPage'
import Login from './login'
import EditPersonalPage from './editPersonalPage'
import { BottomNavigation } from 'reactjs-bottom-navigation'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
const itemsMenu = [
  {
    label: 'Trang Chủ',
    key: '',
    icon: <HomeOutlined />
  },
  {
    label: 'Danh Mục',
    key: 'SubMenu',
    icon: <UnorderedListOutlined />,
    children: [
      {
        label: 'Đồ gia dụng, nội thất, cây cảnh',
        key: 'all-product/gd_nt_cc'
      },
      {
        label: 'Đồ Điện Tử',
        key: 'all-product/dt'
      },
      {
        label: 'Đồ ăn, thực phẩm và các loại khác',
        key: 'all-product/da_tp_oth'
      },
      {
        label: 'Mẹ và bé',
        key: 'all-product/me_be'
      },
      {
        label: 'Thời trang, Đồ dùng cá nhân',
        key: 'all-product/tt_dcn'
      },
      {
        label: 'Giải trí, thê thao',
        key: 'all-product/gt_tt'
      },
      {
        label: 'Đồ dùng văn phòng, công nông nghiệp',
        key: 'all-product/vp_cnn'
      },
      {
        label: 'Tủ lạnh, máy lạnh, máy giặt',
        key: 'all-product/tl_ml_mg'
      }
    ],
  }
];
const items = [
  {
    label: 'Đăng Xuất',
    key: '1',
    icon: <LogoutOutlined />
  },
  {
    label: 'Sản Phẩm',
    key: '2',
    icon: <MenuFoldOutlined />
  }
]
function MenuBarComp() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState();
  const [isShowDialogAddress, isShowDialogLogin] = useState(false)
  const loginState = useSelector(state => state.login);
  const loginStateToken = useSelector(state => state.login.token);
  const onClick = (e) => {
    navigate(e.key)
    setCurrent(e.key);
  };
  const onClose = () => {
    isShowDialogLogin(false)
  }
  const openPopupAddress = () => {
    if (tokenIsExpired() != true) {
      isShowDialogLogin(true)
    }
  };
  useEffect(() => {
    if(loginStateToken != null){
      isShowDialogLogin(false)
    }
  }, [loginStateToken]);
  const tokenIsExpired = () => {
    if (localStorage.getItem("token") == null) {
      return false
    }
    return true
  }

  const bottomNavItems = [
    {
      title: "Trang Chủ",
      icon: <HomeOutlined />,
      onClick: () => { navigate('') },
      activeIcon: <HomeOutlined color="#fff" />
    },
    {
      title: "Đăng Tin",
      icon: <PlusSquareOutlined />,
      onClick: () => {
        if (tokenIsExpired()) {
          navigate('/post-page')
        }
        else {
          openPopupAddress()
        }
      },
      activeIcon: <PlusSquareOutlined color="#fff" />
    },
    {
      title: "Đăng Nhập",
      icon: <LoginOutlined />,
      onClick: () => {
        if (tokenIsExpired() == true) {
          navigate('/personal/' + loginState.userDetail.id)
        } else {
          openPopupAddress()
        }
        // Modal.error({
        //   title: 'Lỗi',
        //   content: 'Vui Lòng Đăng Nhập',
        // });
      },
      activeIcon: <LoginOutlined color="#fff" />,
      render: () => tokenIsExpired() == true ? <Avatar size="small" src={loginState.userDetail.image} icon={<UserOutlined />} /> : <LoginOutlined color="#fff" />,
    },
  ];
  const handlePostBtn = () => {
    if (tokenIsExpired()) {
      navigate('/post-page')
    }
    else {
      openPopupAddress()
    }
  }
  const handleMenuClick = (e) => {
    if(e.key == 1){
      localStorage.removeItem("token")
      // window.location.reload()
      navigate("/")
    }else{
      navigate('/personal/' + loginState.userDetail.id)
    }
  };
  return (
    <>
      <Row align="middle">
        <Col xs={8} sm={8} md={6} lg={8} xl={8}>
          <Menu overflowedIndicator={<MenuOutlined />} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={itemsMenu} />
        </Col>
        <Col xs={16} sm={16} md={12} lg={8} xl={8}>
          <Input placeholder="Tìm Kiếm" />
        </Col>
        <Col style={{ textAlign: "right", paddingRight: "20px" }} xs={0} sm={0} md={0} lg={8} xl={8}>
          <Space className="site-button-ghost-wrapper" style={{ textAlign: "right", paddingRight: "20px" }} wrap>
            <Button onClick={handlePostBtn}>
              Đăng Tin
              {/* <Link to='/post-page'>Đăng Tin</Link> */}
            </Button>
          </Space>
          <Space className="site-button-ghost-wrapper" wrap style={{ width: '20%' }}>
            {tokenIsExpired() == true ?
              <Dropdown
                menu={{
                  items,
                  onClick: handleMenuClick
                }}
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <Avatar size="large" src={loginState.userDetail.image} icon={<UserOutlined />} />
              </Dropdown>
              : <Button onClick={openPopupAddress}>
                Tài Khoản
              </Button>}

          </Space>
        </Col>
        <Login isShow={isShowDialogAddress} setIshow={onClose} />
      </Row>
      <Col xs={10} sm={16} md={12} lg={0} xl={0} >
        <BottomNavigation
          items={bottomNavItems}
          selected={0}
          activeBgColor={'#AED6F1'}
          activeTextColor="white"
        />
      </Col>
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/details/:id' element={< Details />}></Route>
        <Route exact path='/personal-page/:userId' element={< PersonalPage />}></Route>
        <Route exact path='/post-page' element={< PostPage />}></Route>
        <Route exact path='/all-product/gd_nt_cc' element={< AllProduct />}></Route>
        <Route exact path='/all-product/dt' element={< AllProduct />}></Route>
        <Route exact path='/all-product/da_tp_oth' element={< AllProduct />}></Route>
        <Route exact path='/all-product/me_be' element={< AllProduct />}></Route>
        <Route exact path='/all-product/tt_dcn' element={< AllProduct />}></Route>
        <Route exact path='/all-product/gt_tt' element={< AllProduct />}></Route>
        <Route exact path='/all-product/vp_cnn' element={< AllProduct />}></Route>
        <Route exact path='/all-product/tl_ml_mg' element={< AllProduct />}></Route>
        <Route exact path='/personal/:userId' element={< EditPersonalPage />}></Route>
      </Routes>
    </>
  );
}
export default MenuBarComp;