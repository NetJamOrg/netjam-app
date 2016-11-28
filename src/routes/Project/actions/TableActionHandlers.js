import ProjectConstants from '../constants';

const ACTION_HANDLERS = {
  [ProjectConstants.UPDATE_TEMPO]:    (state, action) => ({ ...state, tempo: action.payload }),
  [ProjectConstants.UPDATE_TIME_SIG]: (state, action) => ({ ...state, timeSig: action.payload }),
  [ProjectConstants.UPDATE_TIME_DIV]: (state, action) => ({ ...state, timeInterval: action.payload }),
};

export default ACTION_HANDLERS;
