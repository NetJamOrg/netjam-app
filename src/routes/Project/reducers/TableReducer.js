import ACTION_HANDLERS from '../actions/TableActionHandlers';

const initialState = {
    widthPx: 1300,
    timeInterval: 4, // 1/4
    timeSig: 4 // beats per measure
};
export default function tableReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
