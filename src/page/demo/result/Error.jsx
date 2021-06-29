import React from 'react'
import { Button, Card, Icon } from 'fish';
import Result from '@/component/status/Result'

const extra = (
  <>
    <div
      style={{
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: '500',
        marginBottom: 16
      }}
    >
      您提交的内容有如下错误：
    </div>
    <div style={{ marginBottom: 16 }}>
    <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle-o" />
      具体错误信息一
    </div>
    <div>
    <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle-o" />
      具体错误信息二
    </div>
  </>
)

const actions = (
  <Button type="primary">
    返回修改
  </Button>
)

export default function Error() {
  return (
    <Card bordered={false}>
      <Result type="error" title="提交失败" description="请核对并修改以下信息后，再重新提交。" extra={extra} actions={actions} style={{ marginTop: 48, marginBottom: 16 }} />
    </Card>
  )
}
