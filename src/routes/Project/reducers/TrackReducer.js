import ACTION_HANDLERS from '../actions/TrackActionHandler';

const initialState = {};
export default function trackReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
