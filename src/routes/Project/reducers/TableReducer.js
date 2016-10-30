import ACTION_HANDLERS from '../actions/TableActionHandlers';

const initialState = 5;
export default function tableReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
