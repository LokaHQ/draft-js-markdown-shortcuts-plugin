"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _linkStrategy = _interopRequireDefault(require("./linkStrategy"));

var _Link = _interopRequireDefault(require("../../components/Link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createLinkDecorator = (config, store) => ({
  strategy: (0, _linkStrategy.default)(config, store),
  component: _Link.default
});

var _default = createLinkDecorator;
exports.default = _default;