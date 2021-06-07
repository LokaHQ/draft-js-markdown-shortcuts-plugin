"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Image = ({
  entityKey,
  children,
  contentState
}) => {
  const {
    src,
    alt,
    title
  } = contentState.getEntity(entityKey).getData();
  return /*#__PURE__*/_react.default.createElement("span", null, children, /*#__PURE__*/_react.default.createElement("img", {
    src: src,
    alt: alt,
    title: title
  }));
};

var _default = Image;
exports.default = _default;