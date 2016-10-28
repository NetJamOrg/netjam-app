import ProjectConstants from '../constants';

export function addClip(clip) {
  console.log('adding clip', clip);
  return {
    type: ProjectConstants.ADD_CLIP,
    payload: clip
  };
}

export const actions = {
  addClip
};
