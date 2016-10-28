import ProjectConstants from '../constants';

export function addTrack() {
  console.log('adding track');
  return {
    type: ProjectConstants.ADD_TRACK_TO_TABLE,
    payload: 1
  };
}

export function removeTrack() {
  console.log('removing track');
  return {
    type: ProjectConstants.REMOVE_TRACK_FROM_TABLE,
    payload: 1
  };
}

export const actions = {
  addTrack,
  removeTrack
};
