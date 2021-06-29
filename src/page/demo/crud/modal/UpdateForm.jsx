import React from 'react'
import { actions } from '@gem-mine/durex'
import {
  Input, Select, Modal, message, Form
} from 'fish'

const FormItem = Form.Item
const { Option } = Select

function UpdateForm(props) {
  const { data, handleHide, visible } = props
  const [form] = Form.useForm()
  const handleSubmit = (_data, _handleHide) => {
    form.validateFields().then((item) => {
      const curItem = Object.assign(_data, item)
      actions.demoModal.update(curItem).then(() => {
        _handleHide()
        message.success('更新数据成功')
      })
    })
  }

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 }
  }

  return (
    <Modal destroyOnClose width={640} title="修改用户" visible={visible} onOk={() => handleSubmit(data, handleHide)} onCancel={handleHide}>
      <Form
        form={form}
      >
        <FormItem
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名！' }]}
          initialValue={data.name}
          {...layout}
        >
          <Input placeholder="请输入姓名" disabled />
        </FormItem>
        <FormItem
          name="sex"
          label="性别"
          rules={[{ required: true, message: '请选择性别！' }]}
          initialValue={data.sex}
          {...layout}
        >
          <Select placeholder="请选择性别" className="full-width">
            <Option value={1}>男</Option>
            <Option value={2}>女</Option>
            <Option value={0}>未知</Option>
          </Select>
        </FormItem>
        <FormItem
          name="address"
          label="地址"
          rules={[{ required: true, message: '请输入地址' }]}
          initialValue={data.address}
          {...layout}
        >
          <Input.TextArea placeholder="请输入地址" />
        </FormItem>
      </Form>
    </Modal>
  )
}

export default UpdateForm
