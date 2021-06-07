"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const createImageStrategy = () => {
  const findImageEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'IMG';
    }, callback);
  };

  return findImageEntities;
};

var _default = createImageStrategy;
exports.default = _default;