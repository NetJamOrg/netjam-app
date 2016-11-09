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

export function updateClip(oldClip, newClip) {
  // console.log('updating clip', oldClip, newClip);
  return {
    type: ProjectConstants.UPDATE_CLIP,
    payload: { oldClip, newClip }
  };
}

export function duplicateClip(clip) {
  return {
    type: ProjectConstants.DUPLICATE_CLIP,
    payload: clip
  };
}

export function dragDuplicateClip(clip, newId) {
  clip.startTime += 1;
  clip.endTime += 1;

  return {
    type: ProjectConstants.DRAG_DUPLICATE_CLIP,
    payload: { ...clip, id: newId, ghostClip: true }
  };
}

export const actions = {
  addClipToTrack,
  addTrack,
  removeTrack,
  updateClip,
  duplicateClip,
  dragDuplicateClip
};
