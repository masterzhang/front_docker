import React from 'react'
import { Layout } from 'fish'
import { actions } from '@gem-mine/durex'
import { Routes, withRouter } from '@gem-mine/durex-router'
import config from '@/config/site'
import style from './style.module.less'
import Sider from './Sider'
import Header from './Header'
import Navigator from './Navigator'
import Footer from './Footer'

const { Content } = Layout

@withRouter
class BasicLayout extends React.PureComponent {
  componentDidMount() {
    actions.user.fetchCurrent()
  }

  render() {
    const layout = (
      <Layout className={style.main}>
        {config.sider ? <Sider /> : null}
        <Layout>
          {config.header ? <Header /> : null}
          {config.breadcrumb ? <Navigator /> : null}
          <Content className={style.content}>
            <Routes path="main" />
          </Content>
          {config.footer ? <Footer /> : null}
        </Layout>
      </Layout>
    )
    return layout
  }
}

export default BasicLayout
