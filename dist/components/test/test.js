(() => {
var exports = {};
exports.id = 3;
exports.ids = [3];
exports.modules = {

/***/ 7:
/***/ (() => {

//Component Object
Component({
  properties: {
    myProperty: {
      type: String,
      value: '',
      observer: function observer() {}
    }
  },
  data: {},
  methods: {},
  created: function created() {},
  attached: function attached() {},
  ready: function ready() {},
  moved: function moved() {},
  detached: function detached() {}
});

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(7));

})();