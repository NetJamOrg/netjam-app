import ProjectConstants from '../constants';

const ACTION_HANDLERS = {
  [ProjectConstants.ADD_CLIP_TO_TRACK]: (state, action) => {
    const id = action.payload.id;
    const track = action.payload.start.y;
    const startTime = action.payload.start.x;
    const endTime = action.payload.end.x;
    return { ...state,  [track]: { ...state[track], [startTime]: id, [endTime]: id } };
  }
};

export default ACTION_HANDLERS;
