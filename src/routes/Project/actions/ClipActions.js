import ProjectConstants from '../constants';

export function addClip(clip) {
  return {
    type: ProjectConstants.ADD_CLIP,
    payload: clip
  };
}

export const actions = {
  addClip
};
