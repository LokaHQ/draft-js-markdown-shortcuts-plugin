"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _draftJs = require("draft-js");

var _immutable = require("immutable");

const insertEmptyBlock = (editorState, blockType = 'unstyled', data = {}) => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const key = selection.getStartKey();
  const currentBlock = contentState.getBlockForKey(key);
  const emptyBlockKey = (0, _draftJs.genKey)();
  const emptyBlock = new _draftJs.ContentBlock({
    characterList: (0, _immutable.List)(),
    depth: 0,
    key: emptyBlockKey,
    text: '',
    type: blockType,
    data: (0, _immutable.Map)().merge(data)
  });
  const blockMap = contentState.getBlockMap();
  const blocksBefore = blockMap.toSeq().takeUntil(value => value === currentBlock);
  const blocksAfter = blockMap.toSeq().skipUntil(value => value === currentBlock).rest();
  const augmentedBlocks = [[currentBlock.getKey(), currentBlock], [emptyBlockKey, emptyBlock]];
  const newBlocks = blocksBefore.concat(augmentedBlocks, blocksAfter).toOrderedMap();
  const focusKey = emptyBlockKey;
  const newContentState = contentState.merge({
    blockMap: newBlocks,
    selectionBefore: selection,
    selectionAfter: selection.merge({
      anchorKey: focusKey,
      anchorOffset: 0,
      focusKey,
      focusOffset: 0,
      isBackward: false
    })
  });
  return _draftJs.EditorState.push(editorState, newContentState, 'split-block');
};

var _default = insertEmptyBlock;
exports.default = _default;