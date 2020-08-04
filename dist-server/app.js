"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index"));

var _users = _interopRequireDefault(require("./routes/users"));

var _passwordGenerator = _interopRequireDefault(require("password-generator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../client/build'))); // Put all API endpoints under '/api'

app.get('/api/passwords', function (req, res) {
  var count = 5; // Generate some passwords

  var passwords = Array.from(Array(count).keys()).map(function (i) {
    return (0, _passwordGenerator["default"])(12, false);
  }); // Return them as json

  res.json(passwords);
  console.log("Sent ".concat(count, " passwords"));
}); // The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.

app.get('*', function (req, res) {
  res.sendFile(_path["default"].join(__dirname + '../client/build/index.html'));
});
var _default = app;
exports["default"] = _default;