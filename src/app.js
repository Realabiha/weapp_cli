// app.js
// import { sum } from '@/utils/util'
import axios from 'axios-wx-request'
const { cancelPromise, cancelFunc } = axios.cancelFunc()
console.log(cancelPromise)
axios({ url: 'https://www.baidu.com', cancelPromise }).then(res => console.log(res), rej => console.log(rej))
cancelFunc()
App({
  async onLaunch() {
    console.log('123')
    await 1
    // 展示本地存储能力
    // wx.setStorageSync('test', sum(1,1))
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        res
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
