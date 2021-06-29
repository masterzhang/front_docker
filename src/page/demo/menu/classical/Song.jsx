import React from 'react'
import style from './style.module.less'

export default function Song() {
  return (
    <div className={style.classical}>
      <h2>雨霖铃·寒蝉凄切</h2>
      <h3>宋代: 柳永</h3>
      <p>寒蝉凄切，对长亭晚，骤雨初歇。</p>
      <p>都门帐饮无绪，留恋处，兰舟催发。</p>
      <p>执手相看泪眼，竟无语凝噎。</p>
      <p>念去去，千里烟波，暮霭沉沉楚天阔。</p>
      <p>多情自古伤离别，更那堪，冷落清秋节！</p>
      <p>今宵酒醒何处？杨柳岸，晓风残月。</p>
      <p>此去经年，应是良辰好景虚设。</p>
      <p>便纵有千种风情，更与何人说？</p>
    </div>
  )
}
