export default function genOption({ title, data }) {
  const option = {
    title: {
      text: title,
      textStyle: {
        fontSize: 14
      },
      x: 'center',
      y: 'bottom'
    },
    tooltip: {},
    xAxis: {
      axisLabel: {
        interval: 0
      },
      data: Object.keys(data)
    },
    yAxis: {
      name: '篇'
    },
    series: [
      {
        type: 'bar',
        barMaxWidth: 36,
        itemStyle: {
          color: '#1890ff'
        },
        data: Object.values(data)
      }
    ]
  }
  return option
}
