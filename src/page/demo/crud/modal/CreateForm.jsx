import React from 'react'
import { actions } from '@gem-mine/durex'
import {
  Input, Select, Modal, message, Form
} from 'fish'

const FormItem = Form.Item
const { Option } = Select

function CreateForm(props) {
  const { visible, handleHide } = props
  const [form] = Form.useForm()
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 }
  }

  function handleSubmit(_handleHide) {
    form.validateFields().then((data) => {
      actions.demoModal.create(data).then(() => {
        form.resetFields()
        _handleHide()
        message.success('添加数据成功')
      })
    })
  }

  return (
    <Modal destroyOnClose width={640} title="新增用户" visible={visible} onOk={() => { handleSubmit(handleHide) }} onCancel={handleHide}>
      <Form
        form={form}
      >
        <FormItem
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名！' }]}
          {...layout}
        >
          <Input placeholder="请输入姓名" />
        </FormItem>
        <FormItem
          name="sex"
          label="性别"
          rules={[{ required: true, message: '请选择性别！' }]}
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
          {...layout}
        >
          <Input.TextArea placeholder="请输入地址" />
        </FormItem>
      </Form>

    </Modal>
  )
}

export default CreateForm
