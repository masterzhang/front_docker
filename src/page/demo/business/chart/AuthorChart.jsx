import React, { Component } from 'react'
import { Charts } from 'fish'
import baseRequest from '@gem-mine/request'
import genOption from './helper'
import style from './style.module.less'

const { demo: request } = baseRequest
const title = '文章作者统计'

class AuthorChart extends Component {
  state = {
    data: {} // 作者统计数据
  }

  componentDidMount() {
    request.get('/stat/author').then((data) => {
      this.setState({ data }, () => {
        if (this.chart) {
          this.chart.setOption(genOption({ title, data }))
        }
      })
    })
  }

  render() {
    const option = genOption({
      title,
      data: this.state.data
    })
    return (
      <Charts
        chartOptions={option}
        setComponentInstance={(chart) => {
          this.chart = chart
        }}
        className={style.chart}
      />
    )
  }
}

export default AuthorChart
