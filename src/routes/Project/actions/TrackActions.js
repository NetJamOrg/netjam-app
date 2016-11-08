import ProjectConstants from '../constants';

export function addClipToTrack(clip) {
  console.log('adding clip to track');
  return {
    type: ProjectConstants.ADD_CLIP_TO_TRACK,
    payload: clip
  };
}

export function addTrack() {
  console.log('adding track from tracks');
  return {
    type: ProjectConstants.ADD_TRACK,
    payload: { clips: {} }
  };
}

export function removeTrack(num) {
  console.log('removing track from tracks');
  return {
    type: ProjectConstants.ADD_TRACK,
    payload: num
  };
}

export function updateClip(oldClip, newClip, tableInfo) {
  // console.log('updating clip', oldClip, newClip);
  return {
    type: ProjectConstants.UPDATE_CLIP,
    payload: { oldClip, newClip , tableInfo}
  };
}

export const actions = {
  addClipToTrack,
  addTrack,
  removeTrack,
  updateClip
};
