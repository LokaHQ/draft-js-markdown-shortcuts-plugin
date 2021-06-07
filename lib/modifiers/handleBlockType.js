"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _draftJsCheckableListItem = require("draft-js-checkable-list-item");

var _draftJs = require("draft-js");

var _changeCurrentBlockType = _interopRequireDefault(require("./changeCurrentBlockType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sharps = len => {
  let ret = '';

  while (ret.length < len) {
    ret += '#';
  }

  return ret;
};

const blockTypes = [null, 'header-one', 'header-two', 'header-three', 'header-four', 'header-five', 'header-six'];

const handleBlockType = (editorState, character) => {
  const currentSelection = editorState.getSelection();
  const key = currentSelection.getStartKey();
  const text = editorState.getCurrentContent().getBlockForKey(key).getText();
  const position = currentSelection.getAnchorOffset();
  const line = [text.slice(0, position), character, text.slice(position)].join('');

  const blockType = _draftJs.RichUtils.getCurrentBlockType(editorState);

  for (let i = 1; i <= 6; i += 1) {
    if (line.indexOf(`${sharps(i)} `) === 0 && blockType !== 'code-block' && i !== 3) {
      return (0, _changeCurrentBlockType.default)(editorState, blockTypes[i], line.replace(/^#+\s/, ''));
    }
  }

  let matchArr = line.match(/^[*-] (.*)$/);

  if (matchArr) {
    return (0, _changeCurrentBlockType.default)(editorState, 'unordered-list-item', matchArr[1]);
  }

  matchArr = line.match(/^[\d]\. (.*)$/);

  if (matchArr) {
    return (0, _changeCurrentBlockType.default)(editorState, 'ordered-list-item', matchArr[1]);
  }

  matchArr = line.match(/^> (.*)$/);

  if (matchArr) {
    return (0, _changeCurrentBlockType.default)(editorState, 'blockquote', matchArr[1]);
  }

  matchArr = line.match(/^\[([x ])] (.*)$/i);

  if (matchArr && blockType === 'unordered-list-item') {
    return (0, _changeCurrentBlockType.default)(editorState, _draftJsCheckableListItem.CHECKABLE_LIST_ITEM, matchArr[2], {
      checked: matchArr[1] !== ' '
    });
  }

  return editorState;
};

var _default = handleBlockType;
exports.default = _default;