import React from 'react'
import { Link } from '@gem-mine/durex-router'
import intl from '@gem-mine/intl-react'
import { Button, Card } from 'fish'
import Result from '@/component/status/Result'

const print = () => {
  const printContent = document.getElementById('success-info').innerHTML
  const iframe = document.createElement('iframe')
  iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;')
  document.body.appendChild(iframe)
  const iframeWindow = iframe.contentWindow
  const doc = iframeWindow.document
  doc.write(printContent)
  doc.close()
  iframeWindow.focus()
  iframeWindow.print()
  iframeWindow.onafterprint = function onafterprint() {
    document.body.removeChild(iframe)
  }
}

const extra = (
  <div id="success-info">
    <h2>野望</h2>
    <h3>唐代：杜甫</h3>
    <p>西山白雪三城戍，南浦清江万里桥。</p>
    <p>海内风尘诸弟隔，天涯涕泪一身遥。</p>
    <p>惟将迟暮供多病，未有涓埃答圣朝。</p>
    <p>跨马出郊时极目，不堪人事日萧条。</p>
  </div>
)

const actions = (
  <>
    <Link to="/">
      <Button type="primary">
        {intl.get('app.exception.back')}
      </Button>
    </Link>
    <Button onClick={print}>
      打印
    </Button>
  </>
)

export default function Success() {
  return (
    <Card bordered={false}>
      <Result type="success" title="提交成功" description="提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。本文字区域可以展示简单的补充说明，如果有更复杂的内容，可以用下面的这个灰色区域呈现。" extra={extra} actions={actions} style={{ marginTop: 48, marginBottom: 16 }} />
    </Card>
  )
}
