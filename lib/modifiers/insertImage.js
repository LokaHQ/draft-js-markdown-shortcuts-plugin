"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _draftJs = require("draft-js");

const insertImage = (editorState, matchArr) => {
  const currentContent = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const key = selection.getStartKey();
  const [matchText, alt, src, title] = matchArr;
  const {
    index
  } = matchArr;
  const focusOffset = index + matchText.length;

  const wordSelection = _draftJs.SelectionState.createEmpty(key).merge({
    anchorOffset: index,
    focusOffset
  });

  const nextContent = currentContent.createEntity('IMG', 'IMMUTABLE', {
    alt,
    src,
    title
  });
  const entityKey = nextContent.getLastCreatedEntityKey();

  let newContentState = _draftJs.Modifier.replaceText(nextContent, wordSelection, '\u200B', null, entityKey);

  newContentState = _draftJs.Modifier.insertText(newContentState, newContentState.getSelectionAfter(), ' ');
  const newWordSelection = wordSelection.merge({
    focusOffset: index + 1
  });

  let newEditorState = _draftJs.EditorState.push(editorState, newContentState, 'insert-image');

  newEditorState = _draftJs.RichUtils.toggleLink(newEditorState, newWordSelection, entityKey);
  return _draftJs.EditorState.forceSelection(newEditorState, newContentState.getSelectionAfter());
};

var _default = insertImage;
exports.default = _default;