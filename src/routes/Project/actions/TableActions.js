import * as TableConstants from '../constants';

export function addClip(clip) {
  return {
    type: TableConstants.ADD_CLIP,
    payload: clip
  };
}

export const actions = {
  addClip
};
