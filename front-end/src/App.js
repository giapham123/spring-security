import { UnorderedListOutlined, HomeOutlined, FormatPainterOutlined } from '@ant-design/icons';
import { Menu,Layout } from 'antd';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './modules/home';
import Contact from './modules/allProduct';
import MenuBarComp from './modules/menu';
const { Header, Content, Footer, Sider } = Layout;
const items = [
  {
    label: 'Home',
    key: '',
    icon: <HomeOutlined />
  },
  {
    label: 'Products',
    key: 'SubMenu',
    icon: <UnorderedListOutlined />,
    children: [
      {
        label: 'Tủ',
        key: 'about',
      },
      {
        label: 'Giường',
        key: 'contact',
      },
      {
        label: 'Bàn-Ghế',
        key: '',
      }
    ],
  },
  {
    label: 'Material',
    key: 'material',
    icon: <FormatPainterOutlined />,
    children: [
      {
        label: 'Thường',
        key: 'setting:4',
      },
      {
        label: 'Trung Bình',
        key: 'setting:5',
      },
      {
        label: 'Cao Cấp',
        key: 'setting:6',
      }
    ],
  },
];
const App = () => {
  return (
    <Router>
      <Root />
    </Router>
  );
};
function Root() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState();
  const onClick = (e) => {
    navigate(e.key)
    setCurrent(e.key);
  };
  return (
    <>
      {/* <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/about' element={< About />}></Route>
        <Route exact path='/contact' element={< Contact />}></Route>
      </Routes> */}
      <MenuBarComp/>
      <Footer style={{ textAlign: "center" }}>@ 2004-2020 GPSoft. All rights reserved</Footer>
    </>
  );
}
export default App;