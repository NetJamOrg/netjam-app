/**
 * @fileOverview: ClipsReducer maps a clip id to a clip object
 * Clip Object - Includes start, end, and audio path
 */

import ACTION_HANDLERS from '../actions/ClipActionHandlers';

const initialState = {};
export default function clipsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
