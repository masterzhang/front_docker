import React, { PureComponent } from 'react'
import { smart, actions } from '@gem-mine/durex'
import { Button, Divider, Table, Popconfirm, Icon } from 'fish'
import { modal } from '@/util/crud'
import SearchForm from './SearchForm'
import CreateForm from './CreateForm'
import UpdateForm from './UpdateForm'
import style from './style.module.less'

@smart(({ demoModal }) => ({
  user: demoModal
}))
class ListModal extends PureComponent {
  // 列声明
  columns = [
    {
      title: '姓名',
      width: 150,
      dataIndex: 'name'
    },
    {
      title: '性别',
      width: 150,
      dataIndex: 'sex',
      render(sex) {
        return [
          '未知',
          <span key="man" className={style.man}>
            <Icon type="man" />
            男
          </span>,
          <span key="woman" className={style.woman}>
            <Icon type="woman" />
            女
          </span>
        ][sex];
      }
    },
    {
      title: '地址',
      dataIndex: 'address'
    },
    {
      title: '操作',
      width: 200,
      render: (text, record) => (
        <>
          <a
            onClick={(e) => {
              e.preventDefault()
              this.setState({
                data: record,
                updateModalVisible: true
              })
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除吗？"
            icon={<Icon type="question-circle-o" />}
            onConfirm={() => {
              actions.demoModal.remove({ id: record.id })
            }}
          >
            <a>删除</a>
          </Popconfirm>
        </>
      )
    }
  ]

  constructor(props) {
    super(props)
    this.state = {
      // 提供给编辑框的数据
      data: {}
    }
    // 快速创建内部弹窗
    modal(this, 'create', 'update')
  }

  // 初始化加载
  componentDidMount() {
    actions.demoModal.getList()
  }

  // 页码改变
  handlePageChange = (pager) => {
    actions.demoModal.getList({
      offset: (pager.current - 1) * pager.pageSize
    })
  }

  render() {
    const {
      offset, limit, total, list
    } = this.props.user
    const pagination = {
      current: Math.ceil(offset / limit),
      pageSize: limit,
      total
    }

    return <>
      <div>
        <SearchForm />
        <div className={style.tableListOperator}>
          <Button icon={<Icon type="plus" />} type="primary" onClick={this.showCreateModal}>
            新增
          </Button>
        </div>
        <Table rowKey="id" columns={this.columns} dataSource={list} pagination={pagination} onChange={this.handlePageChange} />
      </div>
      <CreateForm visible={this.state.createModalVisible} handleHide={this.hideCreateModal} />
      <UpdateForm
        data={{ ...this.state.data }}
        visible={this.state.updateModalVisible}
        handleHide={this.hideUpdateModal}
      />
    </>;
  }
}

export default ListModal
