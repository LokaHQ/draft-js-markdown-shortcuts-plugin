"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _insertLink = _interopRequireDefault(require("./insertLink"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handleLink = (editorState, character) => {
  const re = /\[([^\]]+)]\(([^)"]+)(?: "([^"]+)")?\)/g;
  const key = editorState.getSelection().getStartKey();
  const text = editorState.getCurrentContent().getBlockForKey(key).getText();
  const line = `${text}${character}`;
  let newEditorState = editorState;
  let matchArr;

  do {
    matchArr = re.exec(line);

    if (matchArr) {
      newEditorState = (0, _insertLink.default)(newEditorState, matchArr);
    }
  } while (matchArr);

  return newEditorState;
};

var _default = handleLink;
exports.default = _default;