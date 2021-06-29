import React, { PureComponent } from 'react'
import { Menu, Dropdown, Icon } from 'fish'
import classNames from 'classnames'
import intl from '@gem-mine/intl-react'
import { LANGUAGE, saveLanguage } from '@/i18n/config'
import styles from './style.module.less'

export default class SelectLang extends PureComponent {
  changeLang = ({ key }) => {
    saveLanguage(key)
    intl.setLocale(key)
  }

  render() {
    const { className } = this.props
    const { currentLocale } = intl.getLocale()
    const langMenu = (
      <Menu className={styles.menu} selectedKeys={[currentLocale]} onClick={this.changeLang}>
        {Object.keys(LANGUAGE).map((locale) => (
          <Menu.Item key={locale}>
            {LANGUAGE[locale].label}
          </Menu.Item>
        ))}
      </Menu>
    )
    return (
      <Dropdown overlay={langMenu} placement="bottomRight">
        <span className={classNames(styles.dropDown, className)}>
          <Icon type="global" title={intl.get('app.lang')} />
        </span>
      </Dropdown>
    )
  }
}
