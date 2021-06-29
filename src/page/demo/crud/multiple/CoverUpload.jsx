import React, { forwardRef } from 'react'
import ImageUpload from '@/component/ImageUpload'
import { uploadPath, getData, getAction } from '@/util/cs'

// Form组件会去使用ref
const CoverUpload = forwardRef((props, ref) => (
  <ImageUpload
    forwardedRef={ref}
    fileSize={1024 * 1024 * 10}
    fileList={props.fileList}
    uploadPath={uploadPath}
    getData={getData}
    getAction={getAction}
    {...props}
  />
))

export default CoverUpload
