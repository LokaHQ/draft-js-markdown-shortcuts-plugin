"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _draftJs = require("draft-js");

const insertText = (editorState, text) => {
  const selection = editorState.getSelection();
  const content = editorState.getCurrentContent();

  const newContentState = _draftJs.Modifier.insertText(content, selection, text, editorState.getCurrentInlineStyle());

  return _draftJs.EditorState.push(editorState, newContentState, 'insert-fragment');
};

var _default = insertText;
exports.default = _default;