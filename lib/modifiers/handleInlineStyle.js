"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _changeCurrentInlineStyle = _interopRequireDefault(require("./changeCurrentInlineStyle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const inlineMatchers = {
  BOLD: /(?:^|\s|\n|[^A-z0-9_*~`])(\*{2}|_{2})((?!\1).*?)(\1)($|\s|\n|[^A-z0-9_*~`])/g,
  ITALIC: /(?:^|\s|\n|[^A-z0-9_*~`])(\*{1}|_{1})((?!\1).*?)(\1)($|\s|\n|[^A-z0-9_*~`])/g,
  CODE: /(?:^|\s|\n|[^A-z0-9_*~`])(`)((?!\1).*?)(\1)($|\s|\n|[^A-z0-9_*~`])/g,
  STRIKETHROUGH: /(?:^|\s|\n|[^A-z0-9_*~`])(~{2})((?!\1).*?)(\1)($|\s|\n|[^A-z0-9_*~`])/g
};

const handleInlineStyle = (editorState, character) => {
  const key = editorState.getSelection().getStartKey();
  const text = editorState.getCurrentContent().getBlockForKey(key).getText();
  const line = `${text}${character}`;
  let newEditorState = editorState;
  Object.keys(inlineMatchers).some(k => {
    const re = inlineMatchers[k];
    let matchArr;

    do {
      matchArr = re.exec(line);

      if (matchArr) {
        newEditorState = (0, _changeCurrentInlineStyle.default)(newEditorState, matchArr, k);
      }
    } while (matchArr);

    return newEditorState !== editorState;
  });
  return newEditorState;
};

var _default = handleInlineStyle;
exports.default = _default;