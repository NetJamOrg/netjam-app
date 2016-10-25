/**
 * @fileOverview: Table state maps a track num (x) to a Track Object
 * Track Object - Maps beginning time and end time of a clip to clip id
 */

import ACTION_HANDLERS from '../actions/TableActionHandlers';

const initialState = {
  0: {},
  1: {},
  2: {},
  3: {},
  4: {}
};
export default function tableReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
