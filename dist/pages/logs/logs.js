(() => {
var exports = {};
exports.id = 6;
exports.ids = [6];
exports.modules = {

/***/ 5:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// logs.js
var util = __webpack_require__(1);

Page({
  data: {
    logs: []
  },
  onLoad: function onLoad() {
    console.log(util.formatTime);
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        };
      })
    });
  }
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
var __webpack_exports__ = (__webpack_exec__(5));

})();