import React, { PureComponent } from 'react'
import { Link, urlFor } from '@gem-mine/durex-router'
import moment from 'moment'
import { smart, actions } from '@gem-mine/durex'
import {
  Table, Divider, Popconfirm, Tag, Button, Badge, Icon
} from 'fish'
import SearchForm from './SearchForm'
import style from './style.module.less'

@smart(({ demoMultiple }) => ({
  article: demoMultiple
}))
class Article extends PureComponent {
  columns = [
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '作者',
      dataIndex: 'author',
      width: 100,
      align: 'center',
      render: (author) => {
        if (author) {
          return author.name
        }
      }
    },
    {
      title: '是否公开',
      dataIndex: 'public',
      width: 100,
      align: 'center',
      render: (checked) => {
        if (checked) {
          return (
            <>
              <Badge status="success" />
              公开
            </>
          )
        } else {
          return (
            <>
              <Badge status="error" />
              私密
            </>
          )
        }
      }
    },
    {
      title: '发布时间',
      width: 120,
      dataIndex: 'publish_time',
      align: 'center',
      render: (time) => moment(time * 1000).format('YYYY-MM-DD')
    },
    {
      title: '标签',
      key: 'tag',
      dataIndex: 'tag',
      width: 280,
      render: (tags) => {
        if (tags) {
          return (
            <>
              {tags.map((tag) => (
                <Tag.CheckableTag key={tag} checked>
                  {tag}
                </Tag.CheckableTag>
              ))}
            </>
          )
        }
      }
    },
    {
      title: '操作',
      width: 120,
      render: (text, record) => (
        <>
          <Link to={urlFor('main.demo.crud.multiple.update', { id: record.id })}>修改</Link>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除吗？"
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            onConfirm={() => {
              this.handleDelete(record)
            }}
          >
            <a>删除</a>
          </Popconfirm>
        </>
      )
    }
  ]

  componentDidMount() {
    actions.demoMultiple.getList()
  }

  handleDelete = (record) => {
    actions.demoMultiple.remove({ id: record.id })
  }

  handlePageChange = (pager) => {
    actions.demoMultiple.getList({
      offset: (pager.current - 1) * pager.pageSize
    })
  }

  render() {
    const {
      article: {
        list, offset, limit, total
      }
    } = this.props

    const pagination = {
      current: Math.ceil(offset / limit),
      pageSize: limit,
      total
    }

    return (
      <div>
        <SearchForm />
        <div className={style.tableListOperator}>
          <Link to={urlFor('main.demo.crud.multiple.create')}>
            <Button icon={<Icon type="plus" />} type="primary">
              新增
            </Button>
          </Link>
        </div>
        <Table rowKey="id" columns={this.columns} dataSource={list} pagination={pagination} onChange={this.handlePageChange} />
      </div>
    )
  }
}

export default Article
