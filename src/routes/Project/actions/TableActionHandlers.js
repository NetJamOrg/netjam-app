import ProjectConstants from '../constants';

const ACTION_HANDLERS = {
  [ProjectConstants.INCREMENT_TRACKS]: (state, action) => state + action.payload,

  [ProjectConstants.DECREMENT_TRACKS]: (state, action) => state - action.payload
};

export default ACTION_HANDLERS;
