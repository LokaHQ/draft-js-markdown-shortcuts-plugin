"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const createLinkStrategy = () => {
  const findLinkEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
    }, callback);
  };

  return findLinkEntities;
};

var _default = createLinkStrategy;
exports.default = _default;