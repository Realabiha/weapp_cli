// logs.js
import {throtte} from '@/utils/util'
let nowIndex = 0,
    windowHeight = 0

Page({
  data: {
    logs: [],
    views: [],
    pageIndex: 0,
    offsetHeights: []
  },
  onLoad() {
    windowHeight = wx.getSystemInfoSync().windowHeight
    this.handleFetchData()
  },
  onReachBottom(){
    setTimeout(_ => this.handleFetchData())
  },
  onPageScroll: throtte(function(e){
    console.log('onScroll')

    const { scrollTop } = e
    const { offsetHeights, logs } = this.data
    let calcScrollTop = 0
    const tempScrollTop = scrollTop + windowHeight
    if(logs.length < 3){
      return;
    }
    // 遍历元素高度
    for(let i = 0; i < offsetHeights.length; i++){
      const height = offsetHeights[i]
      calcScrollTop += height
      if(calcScrollTop >= tempScrollTop){
        const views = logs.map((log, j) => {
          if(j >= i - 1 && j <= i + 1){
            return log
          }
          return {
            height
          }
        })
        console.log(views)
        console.log(`应该渲染第${i}屏，一共${this.data.pageIndex}屏`)
        this.setData({
          views
        })
        break;
      }
    }
  }, 500),
  async handleFetchData(){
    const value = `logs[${nowIndex}]`
    const data = await new Array(10).fill('').map(_ => {
      return {
        height: Math.random()*1500,
        date: new Date().toLocaleTimeString(),
        color: [Math.random()*255, Math.random()*255, Math.random()*255].join(',')
      }
    })
    this.setData({
      [value]: data,
      pageIndex: nowIndex
    },
    _ => {
      const querySelector = wx.createSelectorQuery()
      querySelector.select(`.log-wrap-${nowIndex}`).boundingClientRect()
      querySelector.exec(res => {
        console.log(`.log-wrap-${nowIndex}`, res, 'nowIndex')
        if(res[0]){
          const value = `offsetHeights[${nowIndex}]`
          this.setData({
            [value]: res[0].height
          }, 
          _ => {
            nowIndex++
          })
        }
      })
    })
  },
})
