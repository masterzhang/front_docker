import React, { Component } from 'react'
import {
  Alert, Form, Icon, Input, Button
} from 'fish'
import { actions, smart } from '@gem-mine/durex'
import intl from '@gem-mine/intl-react'
import style from './style.module.less'

const FormItem = Form.Item

@smart((state) => {
  const {
    status, errorMessage
  } = state.login
  return {
    status,
    errorMessage
  }
})
class Login extends Component {
  renderMessage = (content) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  )

  handleSubmit = (values) => {
    actions.login.login(values)
  }

  render() {
    const {
      status, errorMessage
    } = this.props
    return (
      <div className={style.login}>
        {status === 'error' && this.renderMessage(errorMessage || intl.get('login.message-invalid-credentials'))}
        <Form onFinish={this.handleSubmit}>
          <FormItem
            name="loginName"
            rules={[{ required: true, message: intl.get('validation.userName.required') }]}
          >
            <Input
              placeholder={`${intl.get('login.userName')}: 10009863@fishpro`}
              size="large"
              prefix={<Icon type="user" className={style.prefixIcon} />}
            />
          </FormItem>
          <FormItem
            name="password"
            rules={[{ required: true, message: intl.get('validation.password.required') }]}
          >
            <Input
              placeholder={`${intl.get('login.password')}: fishpro123`}
              size="large"
              prefix={<Icon type="lock" className={style.prefixIcon} />}
              type="password"
            />
          </FormItem>
          <FormItem>
            <Button size="large" className={style.submit} type="primary" htmlType="submit">
              {intl.get('login.login')}
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Login
