import ProjectConstants from '../constants';

const ACTION_HANDLERS = {

  [ProjectConstants.RESIZE_TABLE]: (state, action) => {
    const newSize = action.payload;
    return { ...state, widthPx: parseInt(newSize) };
  },

};

export default ACTION_HANDLERS;
