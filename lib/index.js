"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _draftJsCheckableListItem = require("draft-js-checkable-list-item");

var _immutable = require("immutable");

var _adjustBlockDepth = _interopRequireDefault(require("./modifiers/adjustBlockDepth"));

var _handleBlockType = _interopRequireDefault(require("./modifiers/handleBlockType"));

var _handleInlineStyle = _interopRequireDefault(require("./modifiers/handleInlineStyle"));

var _handleNewCodeBlock = _interopRequireDefault(require("./modifiers/handleNewCodeBlock"));

var _insertEmptyBlock = _interopRequireDefault(require("./modifiers/insertEmptyBlock"));

var _handleLink = _interopRequireDefault(require("./modifiers/handleLink"));

var _handleImage = _interopRequireDefault(require("./modifiers/handleImage"));

var _leaveList = _interopRequireDefault(require("./modifiers/leaveList"));

var _insertText = _interopRequireDefault(require("./modifiers/insertText"));

var _changeCurrentBlockType = _interopRequireDefault(require("./modifiers/changeCurrentBlockType"));

var _link = _interopRequireDefault(require("./decorators/link"));

var _image = _interopRequireDefault(require("./decorators/image"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkCharacterForState(editorState, character) {
  let newEditorState = (0, _handleBlockType.default)(editorState, character);
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const key = selection.getStartKey();
  const currentBlock = contentState.getBlockForKey(key);
  const type = currentBlock.getType();

  if (editorState === newEditorState) {
    newEditorState = (0, _handleImage.default)(editorState, character);
  }

  if (editorState === newEditorState) {
    newEditorState = (0, _handleLink.default)(editorState, character);
  }

  if (editorState === newEditorState && type !== 'code-block') {
    newEditorState = (0, _handleInlineStyle.default)(editorState, character);
  }

  return newEditorState;
}

function checkReturnForState(editorState, ev, {
  insertEmptyBlockOnReturnWithModifierKey
}) {
  let newEditorState = editorState;
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const key = selection.getStartKey();
  const currentBlock = contentState.getBlockForKey(key);
  const type = currentBlock.getType();
  const text = currentBlock.getText();

  if (/-list-item$/.test(type) && text === '') {
    newEditorState = (0, _leaveList.default)(editorState);
  }

  if (newEditorState === editorState && insertEmptyBlockOnReturnWithModifierKey && (ev.ctrlKey || ev.shiftKey || ev.metaKey || ev.altKey || /^header-/.test(type) && selection.isCollapsed() && selection.getEndOffset() === text.length)) {
    newEditorState = (0, _insertEmptyBlock.default)(editorState);
  }

  if (newEditorState === editorState && type !== 'code-block' && /^```([\w-]+)?$/.test(text)) {
    newEditorState = (0, _handleNewCodeBlock.default)(editorState);
  }

  if (newEditorState === editorState && type === 'code-block') {
    if (/```\s*$/.test(text)) {
      newEditorState = (0, _changeCurrentBlockType.default)(newEditorState, type, text.replace(/\n```\s*$/, ''));
      newEditorState = (0, _insertEmptyBlock.default)(newEditorState);
    } else {
      newEditorState = (0, _insertText.default)(editorState, '\n');
    }
  }

  if (editorState === newEditorState) {
    newEditorState = (0, _handleInlineStyle.default)(editorState, '\n');
  }

  return newEditorState;
}

const createMarkdownShortcutsPlugin = (config = {
  insertEmptyBlockOnReturnWithModifierKey: true
}) => {
  const store = {};
  return {
    store,
    blockRenderMap: (0, _immutable.Map)({
      'code-block': {
        element: 'code',
        wrapper: /*#__PURE__*/_react.default.createElement("pre", {
          spellCheck: "false"
        })
      }
    }).merge(_draftJsCheckableListItem.blockRenderMap),
    decorators: [(0, _link.default)(config, store), (0, _image.default)(config, store)],

    initialize({
      setEditorState,
      getEditorState
    }) {
      store.setEditorState = setEditorState;
      store.getEditorState = getEditorState;
    },

    blockStyleFn(block) {
      switch (block.getType()) {
        case _draftJsCheckableListItem.CHECKABLE_LIST_ITEM:
          return _draftJsCheckableListItem.CHECKABLE_LIST_ITEM;

        default:
          break;
      }

      return null;
    },

    blockRendererFn(block) {
      switch (block.getType()) {
        case _draftJsCheckableListItem.CHECKABLE_LIST_ITEM:
          {
            return {
              component: _draftJsCheckableListItem.CheckableListItem,
              props: {
                onChangeChecked: () => store.setEditorState(_draftJsCheckableListItem.CheckableListItemUtils.toggleChecked(store.getEditorState(), block)),
                checked: !!block.getData().get('checked')
              }
            };
          }

        default:
          return null;
      }
    },

    onTab(ev) {
      const editorState = store.getEditorState();
      const newEditorState = (0, _adjustBlockDepth.default)(editorState, ev);

      if (newEditorState !== editorState) {
        store.setEditorState(newEditorState);
        return 'handled';
      }

      return 'not-handled';
    },

    handleReturn(ev, editorState) {
      const newEditorState = checkReturnForState(editorState, ev, config);

      if (editorState !== newEditorState) {
        store.setEditorState(newEditorState);
        return 'handled';
      }

      return 'not-handled';
    },

    handleBeforeInput(character, editorState) {
      if (character.match(/[A-z0-9_*~`]/)) {
        return 'not-handled';
      }

      const newEditorState = checkCharacterForState(editorState, character);

      if (editorState !== newEditorState) {
        store.setEditorState(newEditorState);
        return 'handled';
      }

      return 'not-handled';
    },

    handlePastedText(text, html, editorState) {
      if (html) {
        return 'not-handled';
      }

      if (!text) {
        return 'not-handled';
      }

      let newEditorState = editorState;
      let buffer = [];

      for (let i = 0; i < text.length; i += 1) {
        // eslint-disable-line no-plusplus
        if (text[i].match(/[^A-z0-9_*~`]/)) {
          newEditorState = (0, _utils.replaceText)(newEditorState, buffer.join('') + text[i]);
          newEditorState = checkCharacterForState(newEditorState, text[i]);
          buffer = [];
        } else if (text[i].charCodeAt(0) === 10) {
          newEditorState = (0, _utils.replaceText)(newEditorState, buffer.join(''));
          const tmpEditorState = checkReturnForState(newEditorState, {}, config);

          if (newEditorState === tmpEditorState) {
            newEditorState = (0, _insertEmptyBlock.default)(tmpEditorState);
          } else {
            newEditorState = tmpEditorState;
          }

          buffer = [];
        } else if (i === text.length - 1) {
          newEditorState = (0, _utils.replaceText)(newEditorState, buffer.join('') + text[i]);
          buffer = [];
        } else {
          buffer.push(text[i]);
        }
      }

      if (editorState !== newEditorState) {
        store.setEditorState(newEditorState);
        return 'handled';
      }

      return 'not-handled';
    }

  };
};

var _default = createMarkdownShortcutsPlugin;
exports.default = _default;