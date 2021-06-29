import React from 'react'
import classNames from 'classnames'
import { Icon } from 'fish'
import styles from './style.module.less'

export default function Result({
  className,
  type,
  title,
  description,
  extra,
  actions,
  ...restProps
}) {
  const iconMap = {
    error: <Icon type="close-circle" theme="filled" className={styles.error} />,
    success: <Icon type="check-circle" theme="filled" className={styles.success} />
  }
  const clsString = classNames(styles.result, className)
  return (
    <div className={clsString} {...restProps}>
      <div className={styles.icon}>{iconMap[type]}</div>
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.description}>{description}</div>}
      {extra && <div className={styles.extra}>{extra}</div>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  )
}
