// app.js
import { sum } from '@/utils/util'

App({
  async onLaunch() {
    console.log("onLaunch")
    await 1
    // 展示本地存储能力
    wx.setStorageSync('test', sum(1,1))
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
