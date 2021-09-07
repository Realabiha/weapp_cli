(() => {
var exports = {};
exports.id = 5;
exports.ids = [5];
exports.modules = {

/***/ 2:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lottie_miniprogram__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var lottie_miniprogram__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lottie_miniprogram__WEBPACK_IMPORTED_MODULE_0__);
// index.js
// 获取应用实例
var app = getApp();

var util = __webpack_require__(1);

var parallel = __webpack_require__(13);


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    flag: true,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false

  },
  // 事件处理函数
  bindViewTap: function bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },
  onLoad: function onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      });
    }
  },
  onReady: function onReady() {
    var _this = this;

    setTimeout(function (_) {
      _this.setData({
        flag: false
      });
    });
    wx.createSelectorQuery().select('#canvas').node(function (res) {
      var canvas = res.node;
      lottie_miniprogram__WEBPACK_IMPORTED_MODULE_0___default().setup(canvas);
      lottie_miniprogram__WEBPACK_IMPORTED_MODULE_0___default().loadAnimation({
        autoplay: true,
        loop: true,
        animationData: __webpack_require__(4),
        rendererSettings: {
          context: canvas.getContext('2d')
        }
      });
    }).exec();
  },
  getUserProfile: function getUserProfile(e) {
    var _this2 = this;

    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息',
      // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: function success(res) {
        console.log(res);

        _this2.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      }
    });
  },
  getUserInfo: function getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  }
});

/***/ }),

/***/ 13:
/***/ (() => {

var tasks = [1, 2, 3, 4, 5];
var promises = tasks.map(function (task) {
  return new Promise(function (resolve) {
    var delay = Math.random() * 1000 + 100;
    setTimeout(function (_) {
      resolve(task);
      console.log(task, 'async');
    }, delay);
  });
});
var parallelPromise = promises.reduce(function (prev, next) {
  return prev.then(function (_) {
    return next.then(function (data) {
      console.log(data, 'data');
      return data;
    });
  }, Promise.resolve());
});
parallelPromise.then(function (_) {
  return console.log('done');
})["catch"](function (err) {
  return console.log(err);
});

/***/ }),

/***/ 1:
/***/ ((module) => {

var formatTime = function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return "".concat([year, month, day].map(formatNumber).join('/'), " ").concat([hour, minute, second].map(formatNumber).join(':'));
};

var formatNumber = function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0".concat(n);
};

module.exports = {
  formatTime: formatTime
};

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4,0], () => (__webpack_exec__(2)));

})();