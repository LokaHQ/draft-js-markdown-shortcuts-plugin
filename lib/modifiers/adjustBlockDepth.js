"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _draftJsCheckableListItem = require("draft-js-checkable-list-item");

var _draftJs = require("draft-js");

const adjustBlockDepth = (editorState, ev) => {
  const newEditorState = _draftJsCheckableListItem.CheckableListItemUtils.onTab(ev, editorState, 4);

  if (newEditorState !== editorState) {
    return newEditorState;
  }

  return _draftJs.RichUtils.onTab(ev, editorState, 4);
};

var _default = adjustBlockDepth;
exports.default = _default;