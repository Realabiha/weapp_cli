// logs.js
import {sum} from '@/utils/util'
Page({
  data: {
    logs: []
  },
  onLoad() {
    sum(1, 1)
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: new Date(log),
          timeStamp: log
        }
      })
    })
  }
})
