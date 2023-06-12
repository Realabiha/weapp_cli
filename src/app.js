// app.js
// import { sum } from '@/utils/util'
// import axios from 'axios-wx-request'
import axios from '@/utils/axios-wx-request'
const { cancelPromise, cancelFunc } = axios.cancelFunc()
console.log(cancelPromise)
console.log(axios, 'axios')
axios.intercepter.request.use(_ => { console.log(11); return _ }, _ => _)
axios.intercepter.request.use(_ => { console.log(22); return _ }, _ => _)
axios.intercepter.response.use(_ => { console.log(33); return _ }, _ => _)
axios.intercepter.response.use(_ => { console.log(44); return _.data }, _ => _)
axios({ url: 'https://www.baidu.com', cancelPromise }).then(res => console.log(res), rej => console.log(rej))
// cancelFunc()
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
