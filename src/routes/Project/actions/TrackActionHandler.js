import ProjectConstants from '../constants';
import _ from 'lodash';

import common from 'common';

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

    if (_.isEqual(oldClip, newClip)) return state;

    let track = state[newClip.track];
    let isMovingRight = oldClip.startTime < newClip.startTime;
    let isMovingLeft = !isMovingRight;
    for (let time in track) {
      let time = Number(time);
      if (Number.isNaN(time)) continue;

      let timeClip = track.clips[track[time]];
      if (timeClip.id === newClip.id) continue;

      if (newClip.endTime >= time - 1 && newClip.startTime <= timeClip.endTime) {
        let clipLength = common.getClipLength(newClip);
        if (isMovingRight) {
          newClip.endTime = time - 1;
          newClip.startTime = time - clipLength - 1;
        } else {
          newClip.endTime = timeClip.endTime + clipLength + 1;
          newClip.startTime = timeClip.endTime + 1;
        }

        break;
      }
    }

    let newTracks;
    if (oldClip.track !== newClip.track) {
      let oldTrack = { ...state[oldClip.track] };
      delete oldTrack[oldClip.startTime];
      delete oldTrack[oldClip.endTime];
      delete oldTrack.clips[id];
      oldTrack.edgeClip = findEdgeClip(oldTrack);

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
          }
        }
      };

      newTracks[newClip.track].edgeClip = findEdgeClip(newTracks[newClip.track]);
    } else {
      newTracks = {
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

      delete newTracks[newClip.track][oldClip.startTime];
      delete newTracks[newClip.track][oldClip.endTime];
      newTracks[newClip.track].edgeClip = findEdgeClip(newTracks[newClip.track]);
    }

    return newTracks;
  }
};

export default ACTION_HANDLERS;

/* HELPERS */
function findEdgeClip(track) {
  let max;
  for (let time in track) {
    time = Number(time);
    if (typeof time === 'number' && !Number.isNaN(time)) {
      if (!max || time > max) max = time;
    }
  }

  if (!max) return null;
  return track.clips[track[max]];
}
