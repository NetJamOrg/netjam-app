import ProjectConstants from '../constants';

export function incrementTracks() {
  console.log('incrementing track');
  return {
    type: ProjectConstants.INCREMENT_TRACKS,
    payload: 1
  };
}

export function decrementTracks() {
  console.log('decrementing track');
  return {
    type: ProjectConstants.DECREMENT_TRACKS,
    payload: 1
  };
}

export const actions = {
  incrementTracks,
  decrementTracks
};
