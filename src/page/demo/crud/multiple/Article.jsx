import React, { Component } from 'react'
import {
  Input, Button, Radio, DatePicker, Editor, Select, message, Form, Icon
} from 'fish'
import moment from 'moment'
import { actions } from '@gem-mine/durex'
import { getIn } from '@gem-mine/immutable'
import { withRouter } from '@gem-mine/durex-router'
import baseRequest from '@gem-mine/request'
import TagSelect from '@/component/TagSelect'
import editorConfig from '@/config/component/ueditor'
import CoverUpload from './CoverUpload'
import style from './style.module.less'

const { demo: request } = baseRequest
const FormItem = Form.Item
const RadioGroup = Radio.Group
const { Option } = Select

@withRouter
class Article extends Component {
  state = {
    article: {}, // 文章数据
    tag: [], // 所有标签数据
    author: [] // 作者数据
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    // 根据id 获取article的具体信息
    if (id) {
      try {
        const article = await request.get(`/article/${id}`)
        this.setState({ article, ready: true })
        this.editorRef.readyCallback((editor) => {
          editor.setContent(article.content)
        })
      } catch {
        actions.router.push('/demo/crud/multiple')
        return
      }
    } else {
      // 新增时，首次进入取一次作者数据
      const author = await request.get('/author/article')
      this.setState({
        author
      })
    }
    const tag = await request.get('/tag/article')
    this.setState({ tag })
  }

  getAuthor = (value) => {
    request
      .get('/author/article', {
        params: {
          name: value
        }
      })
      .then((author) => {
        this.setState({ author })
      })
  }

  handleSubmit = (data) => {
    const {
      match: {
        params: { id }
      }
    } = this.props

    data.publish_time = parseInt(data.publish_time / 1000, 10)
    if (id) {
      actions.demoMultiple
        .update({
          id,
          ...data
        })
        .then(() => {
          message.success('更新文章成功')
          actions.router.push('/demo/crud/multiple')
        })
    } else {
      actions.demoMultiple.create(data).then(() => {
        message.success('新增文章成功')
        actions.router.push('/demo/crud/multiple')
      })
    }
  }

  saveEditorRef = (node) => {
    this.editorRef = node
  }

  render() {
    const { article, tag, author } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }
    if (this.props.match.params.id && !this.state.ready) return null

    const authorItem = getIn(article, 'author.name')
    return (
      <Form onFinish={this.handleSubmit} {...formItemLayout}>
        <FormItem
          name="title"
          label="标题"
          rules={[
            {
              required: true,
              message: '请输入标题'
            }
          ]}
          initialValue={article.title}
        >
          <Input placeholder="请输入标题" />
        </FormItem>
        <FormItem
          name="tag"
          label="标签"
          rules={[
            {
              required: true,
              message: '请选择标签'
            }
          ]}
          initialValue={article.tag}
        >
          <TagSelect hideCheckAll>
            {tag.map((item) => (
              <TagSelect.Option key={item} value={item}>
                {item}
              </TagSelect.Option>
            ))}
          </TagSelect>
        </FormItem>
        <FormItem
          name="description"
          label="摘要"
          rules={[
            {
              required: true,
              message: '请输入摘要'
            }
          ]}
          initialValue={article.description}
        >
          <Input.TextArea placeholder="请输入摘要" />
        </FormItem>
        {
          authorItem ? <FormItem label="作者">{authorItem}</FormItem>
            : (
              <FormItem
                name="author"
                rules={[
                  {
                    required: true,
                    message: '请输入作者'
                  }
                ]}
                label="作者"
              >
                <Select
                  showSearch
                  onSearch={this.getAuthor}
                  optionFilterProp="children"
                  notFoundContent={null}
                  showArrow={false}
                  placeholder="请输入作者"
                  allowClear
                >
                  {author.map((item) => (
                    <Option key={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </FormItem>
            )
        }
        <FormItem
          name="public"
          label="是否公开"
          rules={[
            {
              required: true,
              message: '请选择是否公开'
            }
          ]}
          initialValue={article.public === undefined ? true : article.public}
        >
          <RadioGroup>
            <Radio value>公开</Radio>
            <Radio value={false}>不公开</Radio>
          </RadioGroup>
        </FormItem>
        <Form.Item
          name="cover"
          rules={[
            {
              required: true,
              message: '请上传封面'
            }
          ]}
          initialValue={article.cover}
          label="封面"
          valuePropName="fileList"
          extra="请上传jpg,jpeg,png,gif,bmp图片文件，文件大小不超过10M"
        >
          <CoverUpload action={window.getAction} data={window.getData} listType="picture">
            <Button>
              <Icon type="upload" />
              点击上传
            </Button>
          </CoverUpload>
        </Form.Item>
        <FormItem
          name="publish_time"
          label="发布时间"
          rules={[
            {
              required: true,
              message: '请选择发布时间'
            }
          ]}
          initialValue={article.publish_time ? moment(article.publish_time * 1000) : undefined}
        >
          <DatePicker placeholder="请选择发布时间" />
        </FormItem>
        <FormItem
          name="content"
          label="正文"
          rules={[
            {
              required: true,
              message: '请输入正文'
            }
          ]}
          initialValue={article.content || ''}
        >
          <Editor editorConfig={editorConfig} ref={this.saveEditorRef} />
        </FormItem>
        <div className={style.publishBtnCtn}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </div>
      </Form>
    )
  }
}

export default Article
