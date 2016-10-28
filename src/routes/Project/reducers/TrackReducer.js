import ACTION_HANDLERS from '../actions/TrackActionHandler';

const initialState = {
  0: { clips: {} },
  1: { clips: {} },
  2: { clips: {} },
  3: { clips: {} },
  4: { clips: {} }
};
export default function trackReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
