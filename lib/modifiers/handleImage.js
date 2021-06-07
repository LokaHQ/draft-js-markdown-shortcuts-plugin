"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _insertImage = _interopRequireDefault(require("./insertImage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handleImage = (editorState, character) => {
  const re = /!\[([^\]]*)]\(([^)"]+)(?: "([^"]+)")?\)/g;
  const key = editorState.getSelection().getStartKey();
  const text = editorState.getCurrentContent().getBlockForKey(key).getText();
  const line = `${text}${character}`;
  let newEditorState = editorState;
  let matchArr;

  do {
    matchArr = re.exec(line);

    if (matchArr) {
      newEditorState = (0, _insertImage.default)(newEditorState, matchArr);
    }
  } while (matchArr);

  return newEditorState;
};

var _default = handleImage;
exports.default = _default;