import ProjectConstants from '../constants';

const ACTION_HANDLERS = {
  [ProjectConstants.ADD_TRACK_TO_TABLE]: (state, action) => {
    return state + action.payload;
  },

  [ProjectConstants.REMOVE_TRACK_FROM_TABLE]: (state, action) => state - action.payload
};

export default ACTION_HANDLERS;
