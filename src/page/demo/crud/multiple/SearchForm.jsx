import React, { PureComponent } from 'react'
import {
  Row, Col, Select, Input, DatePicker, Form, Icon
} from 'fish'
import TagSelect from '@/component/TagSelect'
import moment from 'moment'
import { actions, smart } from '@gem-mine/durex'
import baseRequest from '@gem-mine/request'
import style from './style.module.less'

const { demo: request } = baseRequest
const FormItem = Form.Item
const { RangePicker } = DatePicker
const { Option } = Select

@smart(({ demoMultiple }) => ({
  article: demoMultiple
}))
class ArticleSearch extends PureComponent {
  state = {
    expand: false,
    tag: [], // 所有标签数据
    author: [] // 作者数据
  }

  componentDidMount() {
    request.get('/tag/article').then((tag) => {
      this.setState({ tag })
    })
    this.getAuthor()
  }

  expand = () => {
    this.setState((prevState) => ({
      expand: !prevState.expand
    }))
  }

  getAuthor = (value) => {
    request.get('/author/article', {
      params: {
        name: value
      }
    }).then((author) => {
      this.setState({ author })
    })
  }

  render() {
    const {
      article: { search }
    } = this.props
    const { tag, author } = this.state

    const formItemLayout = {
      labelCol: {
        sm: { span: 24 },
        xl: { span: 6 },
        xxl: { span: 4 }
      },
      wrapperCol: {
        sm: { span: 24 },
        xl: { span: 16 },
        xxl: { span: 18 }
      }
    }

    return (
      <Form
        layout="horizontal"
        labelAlign="left"
        className={style.SearchForm}
        onValuesChange={(changedValues, allValues) => {
        // 表单项变化时请求数据
          const data = Object.assign(allValues, {
            tag: allValues.tag && allValues.tag.toString(),
            start_time: allValues.publish_time
            && allValues.publish_time[0]
            && allValues.publish_time[0].valueOf(),
            end_time: allValues.publish_time
            && allValues.publish_time[1]
            && allValues.publish_time[1].valueOf()
          })

          delete data.publish_time
          actions.demoMultiple.getList({
            search: data,
            offset: 0
          })
        }}
      >
        <div>
          <FormItem
            name="tag"
            label="标签"
            initialValue={search.tag && search.tag.split(',')}
          >
            <TagSelect expandable hideCheckAll>
              {tag.map((item) => (
                <TagSelect.Option key={item} value={item}>
                  {item}
                </TagSelect.Option>
              ))}
            </TagSelect>
          </FormItem>
        </div>
        <div className={style.formItemContain}>
          <Row>
            <Col span={8}>
              <FormItem
                name="title"
                label="标题"
                initialValue={search.title}
                {...formItemLayout}
              >
                <Input placeholder="请输入" />
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem
                name="public"
                label="是否公开"
                initialValue={search.public}
                {...formItemLayout}
              >
                <Select placeholder="请选择">
                  <Option value="">全部</Option>
                  <Option value="true">是</Option>
                  <Option value="false">否</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          {this.state.expand
            ? (
              <Row>
                <Col span={8}>
                  <FormItem
                    name="author"
                    label="作者"
                    initialValue={search.author}
                    {...formItemLayout}
                  >
                    <Select
                      showSearch
                      allowClear
                      onFocus={this.getAuthor}
                      onSearch={this.getAuthor}
                      optionFilterProp="children"
                      notFoundContent={null}
                      showArrow={false}
                      placeholder="请输入作者"
                    >
                      {author.map((item) => <Option key={item.id}>{item.name}</Option>)}
                    </Select>
                  </FormItem>
                </Col>
                <Col span={10}>
                  <FormItem
                    name="publish_time"
                    label="发布时间"
                    initialValue={search.author}
                    className={[
                      search.start_time && moment(search.start_time),
                      search.start_time && moment(search.end_time)
                    ]}
                    {...formItemLayout}
                  >
                    <RangePicker className={style.publishTime} />
                  </FormItem>
                </Col>
              </Row>
            ) : null}
          <div
            onClick={this.expand}
            className={style.expandOperator}
          >
            更多查询条件
            <Icon type={this.state.expand ? 'up' : 'down'} />
          </div>
        </div>
      </Form>
    )
  }
}

export default ArticleSearch
