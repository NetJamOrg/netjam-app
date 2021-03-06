import React, { Component } from 'react';
import _ from 'lodash';

import './Table.scss';

import TrackContainer from '../containers/TrackContainer';
import CursorHead from './CursorHead';
import PlayHead from './PlayHead'
import ClipContextMenu from './ClipContextMenu';

import logger from 'logger';
import common from 'common';
import ProjectConstants from '../constants';

const CLASS_NAME = 'Table';
const FILE_NAME = 'Table.js';

const $log = logger(FILE_NAME);

let tableDiv;
export default class Table extends Component {
  constructor(props) {
    const METHOD_NAME = 'constructor';
    $log.d(CLASS_NAME, METHOD_NAME, 'Initializing...');

    super(props);
    this.state = {
      pos: this.props.initialPos,
      dragging: false,
      rel: null, // position relative to the cursor
      lastSeen: null,
      slidingClip: false,
      clipMoving: false
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = _.throttle(this.onMouseMove.bind(this), ProjectConstants.CLIP_MOVE_THROTTLE);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.onMouseDown, false);
    window.addEventListener('mouseup', this.onMouseUp, false);
    window.addEventListener('mousemove', this.onMouseMove, false);

    // set the table div width because of edge case where you shrink window with clip out of view,
    // if you scroll to view clip  the tracks will stop where you left the resize
    tableDiv = document.getElementById('table-component');
    tableDiv.style.width = `${tableDiv.clientWidth}px`;
    common.throttle('resize', 'optimizedResize');

    // this is for the scenario wh
    window.addEventListener('optimizedResize', this.onResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.onMouseDown, false);
    window.removeEventListener('mouseup', this.onMouseUp, false);
    window.removeEventListener('mousemove', this.onMouseMove, false);
    window.removeEventListener('optimizedResize', this.onResize, false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  onResize(e) {
    if (document.body.clientWidth > tableDiv.clientWidth) {
      tableDiv.style.width = `${document.body.clientWidth}px`;
    }
  }

  // calculate relative position to the mouse and set dragging=true
  onMouseDown(e) {
    const METHOD_NAME = 'onMouseDown';

    // only left mouse button
    if (e.button !== 0) return;

    // dont allow dragging on ctrl click since this brings up context menu
    if (e.ctrlKey) return;

    let elem = e.srcElement;
    let clipId = common.getClipId(elem);
    if (!clipId) return;
    let trackNum = getClipTrackNum(elem);
    let pos = common.offset(elem);

    // so when your mouse moves faster than clip doesn't change from pointer
    document.body.style.cursor = 'pointer';

    const altPressed = e.altKey;
    if (altPressed) {
      const newId = common.uuid();
      this.props.dragDuplicateClip(this.props.tracks[trackNum].clips[clipId], newId);
      clipId = newId;
    }

    this.setState({
      dragging: { clipId, trackNum },
      rel: {
        x: e.pageX - pos.left,
        y: e.pageY - pos.top
      },
      lastSeen: {
        x: e.pageX,
        y: e.pageY
      }
    });

    e.stopPropagation();
    e.preventDefault();
  }

  onMouseUp(e) {
    const METHOD_NAME = 'onMouseUp';

    if (this.state.dragging) {
      const clip = getClipFromId(this.state.dragging.clipId, this.props);
      if (clip.ghostClip) {
        this.props.deleteClip(clip);
      }

      document.body.style.cursor = 'initial';
      this.setState({ dragging: false, clipMoving: false });
    }

    if (this.state.slidingClip) {
      clearInterval(this.state.slidingClip);
      this.setState({ slidingClip: false });
    }

    e.stopPropagation();
    e.preventDefault();
  }

  onMouseMove(e) {
    const METHOD_NAME = 'onMouseMove';

    moveClip.bind(this)(e);

    e.stopPropagation();
    e.preventDefault();
  }

  updateClip(clipId, oldTrackNum, newTrackNum, newStartTime, isMovingLeft) {
    const METHOD_NAME = 'updateClip';

    const tableDiv = document.getElementById('table-component');

    let oldClip = this.props.tracks[oldTrackNum].clips[clipId];
    let newClip = _.cloneDeep(oldClip);

    let clipTimeLength = newClip.endTime - newClip.startTime;
    newClip.startTime = newStartTime;
    newClip.endTime = newStartTime + clipTimeLength;
    newClip.track = newTrackNum;

    const lineSpacingPx = this.props.numMeasures * this.props.timeInterval;

    this.props.updateClip(oldClip, newClip, lineSpacingPx);

    const getMostEdgeClip = () => {
      let mostEdgeClip;

      for (let trackNum in this.props.tracks) {
        let track = this.props.tracks[trackNum];
        if (!track.edgeClip) continue;
        if (!mostEdgeClip || track.edgeClip.endTime > mostEdgeClip.endTime) {
          mostEdgeClip = track.edgeClip;
        }
      }

      return mostEdgeClip;
    };

    let mostEdgeClip = getMostEdgeClip();
    if (isMovingLeft && mostEdgeClip.id === newClip.id) {
      if (common.timeToPx(newClip.endTime) >= document.body.clientWidth) {
        tableDiv.style.width = `${common.timeToPx(newClip.endTime)}px`;
      }
    }

    if (isMovingLeft) {
      if (common.timeToPx(mostEdgeClip.endTime) < tableDiv.clientWidth
        && tableDiv.clientWidth > document.body.clientWidth) {
        let newWidth = common.timeToPx(mostEdgeClip.endTime);
        if (newWidth < document.body.clientWidth) newWidth = document.body.clientWidth;
        tableDiv.style.width = `${newWidth}px`;
      }
    }
  }

  render() {
    const METHOD_NAME = 'render';

    const lineSpacingPx = this.props.numMeasures * this.props.timeInterval;

    return (
      <div id="table-component" style={{ backgroundSize: `${lineSpacingPx}px` }}>
        <CursorHead clipMoving={ this.state.clipMoving }/>
        <PlayHead clipMoving={ this.state.clipMoving }/>
        <ClipContextMenu duplicateClip={ this.props.duplicateClip } tracks={ this.props.tracks }/>
        { createTracks(this.props) }
      </div>
    );
  }
}

Table.propTypes = {
  numTracks: React.PropTypes.number.isRequired
};

/* Presentation Generation */
function createTracks(props) {
  let tracks = [];
  for (let i = 0; i < props.numTracks; i++) {
    tracks.push(<TrackContainer key={ i } trackNum={ i }/>);
  }

  return tracks;
}

/* EVENT HANDLERS */
function moveClip(e) {
  const FUNCTION_NAME = 'moveClip';

  if (!this.state.dragging) return false;

  const tableDiv = document.getElementById('table-component');
  const trackDiv1 = document.getElementById('track-component-1');

  let pos = {
    x: e.pageX - this.state.rel.x,
    y: e.pageY - this.state.rel.y
  };

  let lastSeen =  {
    x: e.pageX,
    y: e.pageY
  };

  const isMovingRight = e.pageX - this.state.lastSeen.x > 0;
  const isMovingLeft = !isMovingRight;

  let newClipTime = common.pxToTime(pos.x);

  // Don't move clip past start
  if (newClipTime < 0) newClipTime = 0;

  const clip = getClipFromId(this.state.dragging.clipId, this.props);

  let tableTop = common.offset(tableDiv).top;
  let trackHeight = trackDiv1.clientHeight;

  // + .1 makes it a bit more snappy
  let newTrackNum = (e.pageY - tableTop) / trackHeight - 1;
  newTrackNum = newTrackNum % 1 >= ProjectConstants.MOVE_CLIP_UP_DOWN_THRESHOLD ? newTrackNum + 1 : newTrackNum;
  newTrackNum = Math.floor(newTrackNum);
  if (newTrackNum >= this.props.numTracks) newTrackNum = this.props.numTracks - 1;
  if (newTrackNum < 0) newTrackNum = 0;

  const bodyWidth = document.body.clientWidth;
  const tableWidth = tableDiv.clientWidth;

  let slidingClip = this.state.slidingClip;

  if (newTrackNum !== clip.track) {
    if (slidingClip) {
      clearInterval(slidingClip);
      slidingClip = false;
    }
  }

  const setSlideRightInterval = () => setInterval(() => {
      newClipTime += ProjectConstants.SLIDE_TIME;
      let newClipEndPx = common.timeToPx(newClipTime + common.getClipLength(clip));
      if (newClipEndPx > tableWidth) {
        tableDiv.style.width = `${newClipEndPx}px`;
      }

      document.body.scrollLeft += common.timeToPx(ProjectConstants.SLIDE_TIME);
      this.updateClip(clip.id, clip.track, newTrackNum, newClipTime, isMovingLeft);
    }, ProjectConstants.SLIDE_INTERVAL_TIME);

  const setSlideLeftInterval = () => setInterval(() => {
    newClipTime -= ProjectConstants.SLIDE_TIME;
    if (newClipTime < 0) newClipTime = 0;
    document.body.scrollLeft -= common.timeToPx(ProjectConstants.SLIDE_TIME);
    this.updateClip(clip.id, clip.track, newTrackNum, newClipTime, isMovingLeft);
  }, ProjectConstants.SLIDE_INTERVAL_TIME);

  if (newClipTime >= common.pxToTime(document.body.scrollLeft + bodyWidth) - common.getClipLength(clip)) {
    newClipTime = common.pxToTime(document.body.scrollLeft + bodyWidth) - common.getClipLength(clip);

    if (!slidingClip && newTrackNum === clip.track) {
      slidingClip = setSlideRightInterval();
    }
  } else if (newClipTime <= common.pxToTime(document.body.scrollLeft)) {
    newClipTime = common.pxToTime(document.body.scrollLeft);

    if (!slidingClip && newTrackNum === clip.track) {
      slidingClip = setSlideLeftInterval();
    }
  } else {
    if (slidingClip) {
      clearInterval(slidingClip);
      slidingClip = false;
    }
  }

  this.setState({
    pos,
    dragging: { clipId: clip.id },
    clipMoving: true,
    lastSeen,
    slidingClip
  });

  if (clip.startTime === newClipTime
    && newTrackNum === clip.track) return;

  this.updateClip(clip.id, clip.track, newTrackNum, newClipTime, isMovingLeft);

}

/* HELPERS */

function getClipTrackNum(elem) {
  if (!elem) return null;
  return elem.dataset.track;
}

function getClipFromId(clipId, props) {
  const clipElem = document.getElementById(`clip-component-${clipId}`);
  const trackNum = clipElem.dataset.track;

  return props.tracks[trackNum].clips[clipId];
}
