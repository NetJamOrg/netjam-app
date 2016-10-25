import ProjectConstants from '../constants';

export function addClip(clip) {
  return {
    type: ProjectConstants.ADD_CLIP_TO_TRACK,
    payload: clip
  };
}

export const actions = {
  addClip
};
