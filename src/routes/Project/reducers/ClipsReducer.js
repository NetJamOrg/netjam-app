/**
 * @fileOverview: ClipsReducer maps a clip id to a clip object
 * Clip Object - Includes start, end, audio, and isEdge info
 */

import ACTION_HANDLERS from '../actions/ClipActionHandlers';

const initialState = {};
export default function clipReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}