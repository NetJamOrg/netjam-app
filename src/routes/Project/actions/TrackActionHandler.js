import ProjectConstants from '../constants';

const ACTION_HANDLERS = {
  [ProjectConstants.ADD_CLIP_TO_TRACK]: (state, action) => {
    const id = action.payload.id;
    const startTime = action.payload.startTime;
    const endTime = action.payload.endTime;
    const track = action.payload.track;
    const clip = { startTime, endTime, id, track };

    let edgeClip;
    if (!state[track].edgeClip) {
      edgeClip = clip;
    } else if (state[track].edgeClip.endTime >= endTime) {
      edgeClip = state[track].edgeClip;
    } else {
      edgeClip = clip;
    }

    return {
      ...state,  [track]: {
        ...state[track],
        [startTime]: id,
        [endTime]: id,
        clips: { ...state[track].clips, [id]: clip }, edgeClip
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

    let newTracks;
    if (oldClip.track !== newClip.track) {
      let oldTrack = { ...state[oldClip.track] };
      delete oldTrack[oldClip.startTime];
      delete oldTrack[oldClip.endTime];
      delete oldTrack.clips[id];

      let edgeClip;
      if (!state[oldClip.track].edgeClip) {
        edgeClip = newClip;
      } else if (state[oldClip.track].edgeClip.endTime >= newClip.endTime) {
        edgeClip = state[oldClip.track].edgeClip;
      } else {
        edgeClip = newClip;
      }

      newTracks = {
        ...state,
        [oldClip.track]: oldTrack,
        [newClip.track]: {
          ...state[newClip.track],
          [newClip.startTime]: id,
          [newClip.endTime]: id,
          clips: {
            ...state[newClip.track].clips,
            [id]: newClip
          },
          edgeClip
        }
      };
    } else {
      let edgeClip;
      if (!state[newClip.track].edgeClip) {
        edgeClip = newClip;
      } else if (state[newClip.track].edgeClip.endTime >= newClip.endTime) {
        edgeClip = state[newClip.track].edgeClip;
      } else {
        edgeClip = newClip;
      }

      newTracks = {
        ...state,
        [newClip.track]: {
          ...state[newClip.track],
          [newClip.startTime]: id,
          [newClip.endTime]: id,
          clips: {
            ...state[newClip.track].clips,
            [id]: newClip
          },
          edgeClip
        }
      };

      delete newTracks[newClip.track][oldClip.startTime];
      delete newTracks[newClip.track][oldClip.endTime];

      console.log(newTracks);

    }

    return newTracks;
  }
};

export default ACTION_HANDLERS;
