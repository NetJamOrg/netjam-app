import ProjectConstants from '../constants';

const ACTION_HANDLERS = {
  [ProjectConstants.ADD_CLIP_TO_TRACK]: (state, action) => {
    const id = action.payload.id;
    const startTime = action.payload.startTime;
    const endTime = action.payload.endTime;
    const track = action.payload.track;
    const clip = { startTime, endTime, id, track };
    return {
      ...state,  [track]: {
        ...state[track], [startTime]: id, [endTime]: id, clips: { ...state[track].clips, [id]: clip }
      }
    };
  },

  [ProjectConstants.ADD_TRACK]: (state, action) => {
    const track = action.payload;
    return { ...state, [Object.keys(state).length]: track };
  },

  [ProjectConstants.UPDATE_CLIP]: (state, action) => {
    const oldClip = action.payload.oldClip;
    const newClip = action.payload.newClip;
    const id = oldClip.id;

    // console.log(oldClip, newClip);
    let newTrack = {
      ...state,
      [newClip.track]: {
        ...state[newClip.track],
        [newClip.startTime]: id,
        [newClip.endTime]: id,
        clips: {
          ...state[newClip.track].clips,
          [id]: newClip
        }
      }
    };

    delete newTrack[oldClip.track][oldClip.startTime];
    delete newTrack[oldClip.track][oldClip.endTime];

    if (oldClip.track !== newClip.track) delete newTrack[oldClip.track].clips[id];

    return newTrack;
  }
};

export default ACTION_HANDLERS;
