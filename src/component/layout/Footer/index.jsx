import React from 'react'
import { Layout } from 'fish'
import config from '@/config/site'
import style from './style.module.less'

const { Footer } = Layout

export default function Foot() {
  return <Footer className={style.footer}>{config.copyright}</Footer>
}
