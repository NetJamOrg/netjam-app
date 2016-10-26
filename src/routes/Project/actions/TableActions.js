import ProjectConstants from '../constants';

export function addClipToTrack(clip) {
  return {
    type: ProjectConstants.ADD_CLIP_TO_TRACK,
    payload: clip
  };
}

export const actions = {
  addClipToTrack
};
