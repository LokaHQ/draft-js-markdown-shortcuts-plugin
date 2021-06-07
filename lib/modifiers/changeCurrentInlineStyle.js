"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _draftJs = require("draft-js");

const changeCurrentInlineStyle = (editorState, matchArr, style) => {
  const currentContent = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const key = selection.getStartKey();
  const {
    index
  } = matchArr;
  const blockMap = currentContent.getBlockMap();
  const block = blockMap.get(key);
  const currentInlineStyle = block.getInlineStyleAt(index).merge();
  const newStyle = currentInlineStyle.merge([style]);
  const focusOffset = index + matchArr[0].length;

  const wordSelection = _draftJs.SelectionState.createEmpty(key).merge({
    anchorOffset: index + matchArr[0].indexOf(matchArr[1]),
    focusOffset
  });

  let newContentState = _draftJs.Modifier.replaceText(currentContent, wordSelection, matchArr[2], newStyle);

  newContentState = _draftJs.Modifier.insertText(newContentState, newContentState.getSelectionAfter(), matchArr[4]);

  const newEditorState = _draftJs.EditorState.push(editorState, newContentState, 'change-inline-style');

  return _draftJs.EditorState.forceSelection(newEditorState, newContentState.getSelectionAfter());
};

var _default = changeCurrentInlineStyle;
exports.default = _default;