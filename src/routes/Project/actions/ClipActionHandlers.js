import ProjectConstants from '../constants';

const ACTION_HANDLERS = {
  [ProjectConstants.ADD_CLIP_TO_MAP]: (state, action) => {
    const id = action.payload.id;
    const track = action.payload.track;
    const startTime = action.payload.startTime;
    const endTime = action.payload.endTime;
    const audioPath = action.payload.audioPath;
    return { ...state,  [id]: { track, startTime, endTime, audioPath, id } };
  }
};

export default ACTION_HANDLERS;
