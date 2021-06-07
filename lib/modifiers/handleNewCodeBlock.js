"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _changeCurrentBlockType = _interopRequireDefault(require("./changeCurrentBlockType"));

var _insertEmptyBlock = _interopRequireDefault(require("./insertEmptyBlock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handleNewCodeBlock = editorState => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const key = selection.getStartKey();
  const currentBlock = contentState.getBlockForKey(key);
  const matchData = /^```([\w-]+)?$/.exec(currentBlock.getText());
  const isLast = selection.getEndOffset() === currentBlock.getLength();

  if (matchData && isLast) {
    const data = {};
    const language = matchData[1];

    if (language) {
      data.language = language;
    }

    return (0, _changeCurrentBlockType.default)(editorState, 'code-block', '', data);
  }

  const type = currentBlock.getType();

  if (type === 'code-block' && isLast) {
    return (0, _insertEmptyBlock.default)(editorState, 'code-block', currentBlock.getData());
  }

  return editorState;
};

var _default = handleNewCodeBlock;
exports.default = _default;