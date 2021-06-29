import React, { useContext } from 'react'
import {
  Input, Select, Divider, Popconfirm, message, Form, Icon
} from 'fish'
import { actions } from '@gem-mine/durex'
import style from './style.module.less'

const { Option } = Select

const EditableContext = React.createContext(null)

const cells = {
  name: (record, item) => {
    const val = record[item.dataIndex]
    if (!record.editable) {
      return val
    }
    if (record._create) {
      return (
        <Form.Item
          name="name"
          rules={[{ required: true, message: '请输入姓名！' }]}
          initialValue={val}
        >
          <Input placeholder="姓名" />
        </Form.Item>
      )
    } else {
      return (
        <Form.Item>
          <Input placeholder="姓名" disabled value={val} />
        </Form.Item>
      )
    }
  },
  sex: (record, item) => {
    const val = record[item.dataIndex]
    if (!record.editable) {
      return [
        '未知',
        <span key="man" className={style.man}>
          <Icon type="man" />
          {' 男'}
        </span>,
        <span key="woman" className={style.woman}>
          <Icon type="woman" />
          {' 女'}
        </span>
      ][val]
    }
    return (
      <Form.Item
        name="sex"
        rules={[{ required: true, message: '请选择性别！' }]}
        initialValue={val}
      >
        <Select placeholder="性别" className="full-width">
          <Option value={1}>男</Option>
          <Option value={2}>女</Option>
          <Option value={0}>未知</Option>
        </Select>
      </Form.Item>
    )
  },
  address: (record, item) => {
    const val = record[item.dataIndex]
    if (!record.editable) {
      return val
    }
    return (
      <Form.Item
        name="address"
        rules={[{ required: true, message: '请输入地址！' }]}
        initialValue={val}
      >
        <Input.TextArea placeholder="地址" />
      </Form.Item>
    )
  },
  operation: (record, item, form) => {
    if (record.editable) {
      return (
        <>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault()
              form.validateFields().then((data) => {
                if (record._create) {
                  actions.demoInline
                    .create({
                      id: record.id,
                      name: data.name,
                      sex: data.sex,
                      address: data.address
                    })
                    .then(() => {
                      message.success('新增数据成功')
                    })
                } else {
                  actions.demoInline
                    .update({
                      id: record.id,
                      sex: data.sex,
                      address: data.address
                    })
                    .then(() => {
                      message.success('编辑数据成功')
                    })
                }
              })
                .catch((err) => {
                  console.error(err)
                })
            }}
          >
            保存
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确认取消？"
            onConfirm={() => {
              if (record._create) {
                actions.demoInline.cancelCreate(record)
              } else {
                actions.demoInline.cancelEdit(record)
              }
            }}
          >
            <a>取消</a>
          </Popconfirm>
        </>
      )
    } else {
      return (
        <>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault()
              actions.demoInline.editRow(record)
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除？"
            onConfirm={() => {
              actions.demoInline.remove({ id: record.id })
            }}
          >
            <a>删除</a>
          </Popconfirm>
        </>
      )
    }
  }
}

export const EditableRow = (props) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>

  )
}

export const EditableCell = (props) => {
  const {
    record,
    dataIndex,
    children
  } = props
  if (dataIndex) {
    const form = useContext(EditableContext)
    const Field = cells[dataIndex]
    return (
      <td>
        {Field(record, props, form)}
      </td>
    )
  }
  return children
}
