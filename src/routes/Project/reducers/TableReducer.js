import ACTION_HANDLERS from '../actions/TableActionHandlers';

const initialState = {
  timeInterval: 4, // 1/4
  timeSig: 4, // beats per measure
  tempo: 120,
  numMeasures: 4
};
export default function tableReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
