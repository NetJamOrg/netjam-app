import ProjectConstants from '../constants';

export function addClipToMap(clip) {
  return {
    type: ProjectConstants.ADD_CLIP_TO_MAP,
    payload: clip
  };
}

export const actions = {
  addClipToMap
};
