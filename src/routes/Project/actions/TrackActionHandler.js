import ProjectConstants from '../constants';
import _ from 'lodash';

import common from 'common';

const ACTION_HANDLERS = {
  [ProjectConstants.DRAG_DUPLICATE_CLIP]: (state, action) => {
    const id = action.payload.id;
    const track = action.payload.track;
    const newClip = action.payload;

    let newTrack = {
      ...state[track],
      clips: { ...state[track].clips, [id]: newClip }
    };

    return {
      ...state,
      [track]: newTrack
    };
  },

  [ProjectConstants.DUPLICATE_CLIP]: (state, action) => {
    const id = action.payload.id;
    const track = action.payload.track;
    const oldClip = state[track].clips[id];
    const newId = common.uuid();
    const newClip = {
      ...oldClip,
      id: newId,
      startTime: oldClip.endTime + 1,
      endTime: oldClip.endTime + 1 + common.getClipLength(oldClip)
    };

    adjustForCollisions(newClip, state[track], false);
    const edgeClip = getEdgeClipOnAdd(state[track], newClip);
    let newTrack = {
      ...state[track],
      clips: { ...state[track].clips, [newId]: newClip },
      edgeClip
    };

    return {
      ...state,
      [track]: newTrack
    };
  },

  [ProjectConstants.ADD_CLIP_TO_TRACK]: (state, action) => {
    const id = action.payload.id;
    const startTime = action.payload.startTime;
    const endTime = action.payload.endTime;
    const track = action.payload.track;
    const ghostClip = false;
    const clip = { startTime, endTime, id, track, ghostClip };

    let edgeClip = getEdgeClipOnAdd(state[track], clip);

    return {
      ...state,  [track]: {
        ...state[track],
        clips: { ...state[track].clips, [id]: clip },
        edgeClip
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

    if (_.isEqual(oldClip, newClip)) return state;

    let newTracks;
    const collision = isCollision(newClip, state[newClip.track]);
    if (oldClip.track !== newClip.track && !collision) {
      if (oldClip.ghostClip) newClip.ghostClip = false;

      let oldTrack = { ...state[oldClip.track] };
      delete oldTrack.clips[id];
      oldTrack.edgeClip = findEdgeClip(oldTrack.clips);

      newTracks = {
        ...state,
        [oldClip.track]: oldTrack,
        [newClip.track]: {
          ...state[newClip.track],
          clips: {
            ...state[newClip.track].clips,
            [id]: newClip
          }
        }
      };

      newTracks[newClip.track].edgeClip = findEdgeClip(newTracks[newClip.track].clips);
    } else {
      if (collision) {
        newClip.track = oldClip.track;
      }

      if (!oldClip.ghostClip) {
        adjustForCollisions(newClip, state[oldClip.track], isMovingRight);
      } else if (oldClip.ghostClip && !isCollision(newClip, state[oldClip.track])) {
        newClip.ghostClip = false;
      }

      newTracks = {
        ...state,
        [oldClip.track]: {
          ...state[oldClip.track],
          clips: {
            ...state[oldClip.track].clips,
            [id]: newClip
          }
        }
      };

      newTracks[oldClip.track].edgeClip = findEdgeClip(newTracks[oldClip.track].clips);
    }

    return newTracks;
  },

  [ProjectConstants.DELETE_CLIP]: (state, action) => {
    const clip = action.payload;
    let newClips = { ...state[clip.track].clips };
    delete newClips[clip.id];

    return {
      ...state,
      [clip.track]: {
        ...state[clip.track],
        clips: newClips,
        edgeClip: findEdgeClip(newClips)
      }
    };
  }
};

export default ACTION_HANDLERS;

/* HELPERS */
function findEdgeClip(clips) {
  let maxClip = null;
  for (let clip of common.iterateObject(clips)) {
    if (!maxClip || clip.endTime > maxClip.endTime) {
      maxClip = clip;
    }
  }

  return maxClip;
}

// handle collision avoidance. not very efficient but should work.
function adjustForCollisions(newClip, track, isMovingRight) {
  for (let timeClip of common.iterateObject(track.clips)) {
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
      adjustForCollisions(newClip, track, isMovingRight);
    }
  }
}

function isCollision(newClip, track) {
  for (let timeClip of common.iterateObject(track.clips)) {
    if (timeClip.id === newClip.id) continue;

    if (newClip.endTime > timeClip.startTime && newClip.startTime <= timeClip.endTime) {
      return true;
    }
  }

  return false;
}

// this will only get the edge clip if the new clip was just added
function getEdgeClipOnAdd(track, clip) {
  let edgeClip;
  if (!track.edgeClip) {
    edgeClip = clip;
  } else if (track.edgeClip.endTime >= clip.endTime) {
    edgeClip = track.edgeClip;
  } else {
    edgeClip = clip;
  }

  return edgeClip;
}
