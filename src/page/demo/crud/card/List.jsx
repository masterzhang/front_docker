import React, { PureComponent } from 'react'
import { smart, actions } from '@gem-mine/durex'
import { Card, Tooltip, Spin, Image, Icon } from 'fish';
import InfiniteScroll from 'react-infinite-scroller'
import style from './style.module.less'

@smart(({ demoCard }) => ({
  article: demoCard
}))
class ListCard extends PureComponent {
  state = {
    hasMore: true
  }

  handleInfiniteOnLoad = () => {
    const {
      article: { list, total, offset }
    } = this.props

    if (list.length < total || total === 0) {
      // https://github.com/CassetteRocks/react-infinite-scroller/issues/143
      if (this.lastOffset !== offset) {
        this.lastOffset = offset
        actions.demoCard.getList({
          offset: this.lastOffset
        })
      }
    } else {
      this.setState({ hasMore: false })
    }
  }

  render() {
    const {
      article: { list }
    } = this.props

    return (
      <div className={style.filterCardList}>
        <InfiniteScroll
          initialLoad
          hasMore={this.state.hasMore}
          loadMore={this.handleInfiniteOnLoad}
          loader={
            (
              <div className={style.infiniteLoading} key={0}>
                <Spin />
              </div>
            )
          }
        >
          {list.map((item) => (
            <Card
              key={item.id}
              className={style.infiniteCard}
              title={item.title}
              bodyStyle={{ padding: '0', fontSize: '0' }}
              headStyle={{ width: '280px' }}
              actions={[
                <Tooltip key="edit" title="编辑">
                    <Icon type="edit" />
                </Tooltip>,
                <Tooltip key="delete" title="删除">
                    <Icon type="delete" />
                </Tooltip>
              ]}
            >
              <Image noBorder size="contain" width="280px" height="140px" alt={item.title} src={item.cover} />
            </Card>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default ListCard
