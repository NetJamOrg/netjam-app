import ProjectConstants from '../constants';
import * as lib from '../../../lib';

export function addClip() {
  return {
    type: ProjectConstants.ADD_CLIP,
    payload: generateClip()
  };
}

export const actions = {
  addClip
};

// TODO (Daniel Yakobian): Remove after testing
function generateClip() {
  let start = {};
  start.x = lib.getRandomIntInclusive(0, 120000);
  start.y = lib.getRandomIntInclusive(0, 4);

  let end = {};
  end.x = lib.getRandomIntInclusive(start.x, 125000);
  end.y = start.y;

  const id = lib.uuid();

  return { start, end, id };
}
