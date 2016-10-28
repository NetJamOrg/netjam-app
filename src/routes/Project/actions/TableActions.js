import ProjectConstants from '../constants';

export function addClipToTrack(clip) {
  console.log('adding clip to track');
  return {
    type: ProjectConstants.ADD_CLIP_TO_TRACK,
    payload: clip
  };
}

export const actions = {
  addClipToTrack
};
