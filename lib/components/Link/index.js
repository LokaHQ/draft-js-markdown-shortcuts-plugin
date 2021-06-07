"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Link = props => {
  const {
    contentState,
    children,
    entityKey
  } = props;
  const {
    href,
    title
  } = contentState.getEntity(entityKey).getData();
  return /*#__PURE__*/_react.default.createElement("a", {
    href: href,
    title: title
  }, children);
};

var _default = Link;
exports.default = _default;