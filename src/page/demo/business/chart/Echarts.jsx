import React, { Component } from 'react'
import { Card, Tabs } from 'fish'
import TagChart from './TagChart'
import AuthorChart from './AuthorChart'

const { TabPane } = Tabs

class Echarts extends Component {
  render() {
    return (
      <Card hoverable={false}>
        <Tabs defaultActiveKey="tag">
          <TabPane tab="标签统计" key="tag">
            <TagChart />
          </TabPane>
          <TabPane tab="作者统计" key="author">
            <AuthorChart />
          </TabPane>
        </Tabs>
      </Card>
    )
  }
}

export default Echarts
