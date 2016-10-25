import * as TableConstants from '../constants';

const ACTION_HANDLERS = {
  [TableConstants.ADD_CLIP]: (state, action) => {
    const id = action.payload.id;
    const track = action.payload.start.x;
    const startTime = action.payload.start.y;
    const endTime = action.payload.end.y;
    return { ...state,  [track]: { ...state[track], [startTime]: id, [endTime]: id } };
  }
};

export default ACTION_HANDLERS;
