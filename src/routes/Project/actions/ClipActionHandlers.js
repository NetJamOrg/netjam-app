import ProjectConstants from '../constants';

const ACTION_HANDLERS = {
  [ProjectConstants.ADD_CLIP]: (state, action) => {
    const id = action.payload.id;
    const track = action.payload.start.y;
    const startTime = action.payload.start.x;
    const endTime = action.payload.end.x;
    const audioPath = action.payload.audioPath;
    return { ...state,  [id]: { track, startTime, endTime, audioPath } };
  }
};

export default ACTION_HANDLERS;
