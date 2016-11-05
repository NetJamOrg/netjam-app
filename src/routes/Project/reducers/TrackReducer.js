import ACTION_HANDLERS from '../actions/TrackActionHandler';

const initialState = {
  0: { clips: {}, edgeClip: null },
  1: { clips: {}, edgeClip: null },
  2: { clips: {}, edgeClip: null },
  3: { clips: {}, edgeClip: null },
  4: { clips: {}, edgeClip: null }
};
export default function trackReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
