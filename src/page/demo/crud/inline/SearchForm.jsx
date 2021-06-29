import React from 'react'
import { smart, actions } from '@gem-mine/durex'
import {
  Row, Col, Select, Button, Input, Form
} from 'fish'
import style from './style.module.less'

const FormItem = Form.Item
const { Option } = Select

@smart(({ demoInline }) => ({
  user: demoInline
}))
class SearchForm extends React.PureComponent {
  handleSearch = (data) => {
    actions.demoInline.getList({ search: { offset: 0, ...data } })
  }

  render() {
    const { search } = this.props.user
    const layout = { md: 8, sm: 24 }
    const gutter = { md: 8, lg: 24, xl: 48 }

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
        xl: { span: 5 },
        xxl: { span: 4 }
      },
      wrapperCol: {
        sm: { span: 18 },
        xl: { span: 19 },
        xxl: { span: 18 }
      }
    }

    return (
      <Form onFinish={this.handleSearch} layout="horizontal" labelAlign="left" className={style.SearchForm}>
        <Row gutter={gutter}>
          <Col {...layout}>
            <FormItem
              name="name"
              label="姓名"
              initialValue={search.name}
              {...formItemLayout}
            >
              <Input placeholder="请输入" />
            </FormItem>
          </Col>
          <Col {...layout}>
            <FormItem
              name="sex"
              label="性别"
              initialValue={search.sex}
              {...formItemLayout}
            >
              <Select placeholder="请选择">
                <Option value="">所有性别</Option>
                <Option value={1}>男</Option>
                <Option value={2}>女</Option>
                <Option value={0}>未知</Option>
              </Select>
            </FormItem>
          </Col>
          <Col {...layout}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default SearchForm
