"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _imageStrategy = _interopRequireDefault(require("./imageStrategy"));

var _Image = _interopRequireDefault(require("../../components/Image"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createImageDecorator = (config, store) => ({
  strategy: (0, _imageStrategy.default)(config, store),
  component: _Image.default
});

var _default = createImageDecorator;
exports.default = _default;