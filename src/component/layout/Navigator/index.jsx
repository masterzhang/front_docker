import React from 'react'
import { Breadcrumb, Icon } from 'fish'
import { actions } from '@gem-mine/durex'
import { getRouteByUrlPath, withRouter } from '@gem-mine/durex-router'
import intl from '@gem-mine/intl-react'
import style from './style.module.less'

@withRouter
class Wrapper extends React.Component {
  handleBack = () => {
    const { props } = this
    const route = getRouteByUrlPath(props.location.pathname)
    if (typeof route.back === 'function') {
      route.back(props, actions.router)
    } else {
      actions.router.goBack()
    }
  }

  render() {
    const { props } = this
    const route = getRouteByUrlPath(props.location.pathname)
    if (route) {
      if (route.breadcrumb !== false) {
        const breadcrumb = []
        let cursor = route
        while (cursor) {
          if (cursor.name) {
            breadcrumb.unshift(cursor)
          }
          cursor = cursor.parent
        }
        if (route.sub) {
          const subRoute = Object.values(route.sub).filter((item) => item.index)[0]
          if (subRoute) {
            breadcrumb.push(subRoute)
          }
        }
        if (breadcrumb.length || route.back) {
          let breadcrumbItem
          if (breadcrumb.length) {
            breadcrumbItem = (
              <Breadcrumb className={style.breadcrumb}>
                {breadcrumb.map((item) => <Breadcrumb.Item key={`${item.keyPath}.${item.key}`}>{item.name}</Breadcrumb.Item>)}
              </Breadcrumb>
            )
          }

          let backItem
          if (route.back) {
            backItem = (
              <div className={style.back} onClick={this.handleBack}>
                <Icon type="left" />
                {intl.get('app.back')}
              </div>
            )
          }

          return (
            <div className={style.navigation}>
              {breadcrumbItem}
              {backItem}
            </div>
          )
        }
      }
    }
    return <></>
  }
}

export default Wrapper
