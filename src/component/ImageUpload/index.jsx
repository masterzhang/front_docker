import React, { Component } from 'react'
import { Upload, Icon, message } from 'fish'

import style from './style.module.less'

// upload上传组件的错误码， 具体信息可以查阅http://fish-docs.sdp.101.com/components/upload/#API onError参数
const typeErrorCode = -130
const sizeErrorCode = -110

export default class ImageUpload extends Component {
  state = {
    imageUrl: '',
    loading: false
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({
        loading: false,
        imageUrl: `${this.props.uploadPath}${info.file.response.path}` // 优化
      })
    }
    if (this.props.onChange) {
      this.props.onChange(this.state.imageUrl)
    }
  }

  handleError = (file, code) => {
    if (code === typeErrorCode) {
      message.warn('只能上传jpg,jpeg,png,gif,bmp图片文件！')
    }
    if (code === sizeErrorCode) {
      message.warn('图片文件不能大于10MB！')
    }
  }

  render() {
    const { getAction, getData, fileSize } = this.props
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div>上传</div>
      </div>
    )
    const imageUrl = this.state.imageUrl || this.props.fileList
    return (
      <Upload
        name="cover"
        listType="picture-card"
        showUploadList={false}
        action={getAction}
        data={getData}
        fileType=".jpg, .jpeg, .png, .gif, .bmp"
        fileSize={fileSize}
        onChange={this.handleChange}
        onError={this.handleError}
      >
        {imageUrl ? <img className={style.image} src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    )
  }
}
