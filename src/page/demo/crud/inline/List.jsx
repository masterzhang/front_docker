import React from 'react'
import { Table, Button, Icon } from 'fish'
import { actions, smart } from '@gem-mine/durex'
import SearchForm from './SearchForm'
import { EditableCell, EditableRow } from './EditableRow'
import style from './style.module.less'

@smart(({ demoInline }) => ({
  user: demoInline
}))
class ListInline extends React.Component {
  state = {}

  // 列声明
  columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      width: 150
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 150
    },
    {
      title: '地址',
      dataIndex: 'address'
    },
    {
      title: '操作',
      width: 200,
      dataIndex: 'operation'
    }
  ]

  componentDidMount() {
    actions.demoInline.getList()
  }

  // 页码改变
  handlePageChange = (pager) => {
    actions.demoInline.getList({
      offset: (pager.current - 1) * pager.pageSize
    })
  }

  // UI 界面新增一条待增加的数据
  createRow = () => {
    actions.demoInline.createRow()
  }

  save(form, id) {
    form.validateFields((error, row) => {
      if (error) {
        return
      }
      if (this.state.addable) {
        actions.demoInline.remove({ id: this.addNewId })
        actions.demoInline.create({
          name: row.name,
          sex: row.sex,
          address: row.address
        })
        this.setState({ addable: false })
      } else {
        actions.demoInline.update({
          id,
          sex: row.sex,
          address: row.address
        })
      }
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
    const columns = this.columns.map((col) => ({
      ...col,
      onCell: (record) => ({
        record,
        ...col
      })
    }))
    let dataSource = list
    if (list.length > limit) {
      dataSource = list.slice(0, limit)
    }

    return (
      <div>
        <SearchForm />
        <div className={style.tableListOperator}>
          <Button icon={<Icon type="plus" />} type="primary" onClick={this.createRow}>
            新增
          </Button>
        </div>
        <Table
          rowKey={rowKey}
          dataSource={dataSource}
          components={{
            body: {
              cell: EditableCell,
              row: EditableRow
            }
          }}
          columns={columns}
          onChange={this.handlePageChange}
          pagination={pagination}
        />
      </div>
    )
  }
}

export default ListInline

// ---
// 生成 table 的 row key
function rowKey(record) {
  if (record.id === undefined) {
    return record._id
  }
  return record.id
}
