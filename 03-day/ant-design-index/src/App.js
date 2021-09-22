import React, { useState, useEffect } from 'react'
import { Input, Menu, Row, Col, Button } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'
import 'antd/dist/antd.less'

import './App.less'
import logo from './assets/logo.svg'
import AntDesign from './assets/ant-design.svg'
import { colors, icons } from './getIcons'

function getRandom(length, current) {
  let res
  do {
    res = Math.floor(Math.random() * length)
  } while (res === current)
  return res
}

const App = () => {
  const [currentIconIndex, setCurrentIconIndex] = useState(
    getRandom(icons.length),
  )
  const [currentColorIndex, setCurrentColorIndex] = useState(
    getRandom(colors.length),
  )
  const LogoIcon = icons[currentIconIndex]
  const color = colors[currentColorIndex]

  const [hover, setHover] = useState(false)

  useEffect(() => {
    let timer
    if (hover) {
      timer = setInterval(() => {
        setCurrentIconIndex((index) => getRandom(icons.length, index))
        setCurrentColorIndex((index) => getRandom(colors.length, index))
      }, 100)
    }
    return () => {
      timer && clearInterval(timer)
    }
  }, [hover])
  const mouseEnterHandle = (e) => {
    setHover(true)
  }
  const mouseLeaveHandle = (e) => {
    setHover(false)
  }

  return (
    <div className="App">
      <Row style={{ height: 64 }}>
        <Col flex="100px">
          <h1>
            <a href="/" id="logo">
              <img src={logo} alt="logo" title="logo" /> Ant Design
            </a>
          </h1>
        </Col>
        <Col
          flex="auto"
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: 0,
          }}
        >
          <div id="search-box">
            <Input placeholder="搜索"></Input>
          </div>
          <Menu mode="horizontal" style={{ border: 0 }}>
            <Menu.Item key="nav:1">设计</Menu.Item>
            <Menu.Item key="nav:2">文档</Menu.Item>
            <Menu.Item key="nav:3">组件</Menu.Item>
            <Menu.Item key="nav:4">资源</Menu.Item>
            <Menu.Item key="nav:5">国内镜像</Menu.Item>
            <Menu.SubMenu key="SubMenu" icon={<UnorderedListOutlined />}>
              <Menu.Item key="setting:1">GitHub</Menu.Item>
              <Menu.Item key="setting:2">English</Menu.Item>
              <Menu.Item key="setting:3">RTL</Menu.Item>
              <Menu.Item key="setting:4">Ant Design Charts</Menu.Item>
              <Menu.Item key="setting:5">Ant Design Pro</Menu.Item>
              <Menu.Item key="setting:6">Ant Design Pro Components</Menu.Item>
              <Menu.Item key="setting:7">
                Ant Design of Angular (社区实现)
              </Menu.Item>
              <Menu.Item key="setting:8">
                Ant Design of Vue (社区实现)
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 66 }}>
        <Col
          style={{ position: 'relative' }}
          onMouseEnter={mouseEnterHandle}
          onMouseLeave={mouseLeaveHandle}
        >
          <div>
            <img src={AntDesign} alt="Ant Design" width="500" height="87" />
          </div>
          <div
            style={{
              position: 'absolute',
              top: -10,
              left: 364,
              width: 64,
              height: 64,
            }}
          >
            {LogoIcon && <LogoIcon twoToneColor={color} />}
          </div>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 40 }}>
        <Col
          span={3}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            type="primary"
            shape="round"
            style={{
              marginRight: 20,
            }}
          >
            开始使用
          </Button>
        </Col>
        <Col
          span={3}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button shape="round">设计语言</Button>
        </Col>
      </Row>
    </div>
  )
}

export default App
