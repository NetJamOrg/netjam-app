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

    // handle collision avoidance. not very efficient but should work.
    const adjustForCollisions = function (newClip, track) {
      let times = _(track).keys()
        .map(Number)
        .filter(_.isFinite)
        .sortBy()
        .value();

      for (let time of times) {
        let timeClip = track.clips[track[time]];
        if (timeClip.id === newClip.id) continue;
        let clipLength = common.getClipLength(timeClip);

        // for each clip, if the new clip ends after
        // clip starts and the new clip starts before the clip ends
        if (newClip.endTime > timeClip.startTime && newClip.startTime <= timeClip.endTime) {

          // snap either to that clip's right or left,
          // depending on direction of motion (if right, snap to left, etc)
          if (isMovingRight) {
            newClip.endTime = timeClip.startTime - 1;
            newClip.startTime = timeClip.startTime - clipLength - 1;
          } else {
            newClip.endTime = timeClip.endTime + clipLength + 1;
            newClip.startTime = timeClip.endTime + 1;
          }

          // and recurse
          adjustForCollisions(newClip, track);
        }
      }
    };

    adjustForCollisions(newClip, track);

    if (_.isEqual(oldClip, newClip)) return state;

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
