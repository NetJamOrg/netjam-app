import React, { Component } from 'react';
import _ from 'lodash';

import './Table.scss';

import TrackContainer from '../containers/TrackContainer';

import logger from 'logger';
import common from 'common';
import ProjectConstants from '../constants';

const CLASS_NAME = 'Table';
const FILE_NAME = 'Table.js';

const $log = logger(FILE_NAME);

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
      slidingClip: false
    };
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
    window.addEventListener('mousemove',
      _.throttle(this.onMouseMove.bind(this), ProjectConstants.CLIP_MOVE_THROTTLE), false);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.onMouseDown.bind(this), false);
    window.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
    window.removeEventListener('mousemove',
      _.throttle(this.onMouseMove.bind(this), ProjectConstants.CLIP_MOVE_THROTTLE), false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  // calculate relative position to the mouse and set dragging=true
  onMouseDown(e) {
    const METHOD_NAME = 'onMouseDown';

    // only left mouse button
    if (e.button !== 0) return;
    let elem = e.srcElement;
    let clipId = getClipId(elem);
    let trackNum = getClipTrackNum(elem);
    if (!clipId) return;
    let pos = offset(elem);
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

    if (this.state.dragging) this.setState({ dragging: false });
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

  updateClip(clipId, oldTrackNum, newTrackNum, newStartTime) {
    const METHOD_NAME = 'updateClip';

    let oldClip = this.props.tracks[oldTrackNum].clips[clipId];
    let newClip = { ...oldClip };
    let clipTimeLength = newClip.endTime - newClip.startTime;
    newClip.startTime = newStartTime;
    newClip.endTime = newStartTime + clipTimeLength;
    newClip.track = newTrackNum;
    this.props.updateClip(oldClip, newClip);
  }

  render() {
    const METHOD_NAME = 'render';

    $log.d(CLASS_NAME, METHOD_NAME, 'Rendering');
    return (
      <div id="table-component">
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

  const tableDiv = document.getElementById('table-component');
  const trackDiv1 = document.getElementById('track-component-1');

  if (!this.state.dragging) return false;

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

  let clipId = this.state.dragging.clipId;
  let trackNum = this.state.dragging.trackNum;

  let tableTop = offset(tableDiv).top;
  let trackHeight = trackDiv1.clientHeight;
  let newTrackNum = Math.round((e.pageY - tableTop) / trackHeight) - 1;
  if (newTrackNum >= this.props.numTracks) newTrackNum = this.props.numTracks - 1;
  if (newTrackNum < 0) newTrackNum = 0;

  const clip = this.props.tracks[trackNum].clips[clipId];
  const bodyWidth = document.body.clientWidth;
  const tableWidth = tableDiv.clientWidth;

  let slidingClip = this.state.slidingClip;

  if (newTrackNum !== trackNum) {
    if (slidingClip) {
      clearInterval(slidingClip);
      slidingClip = false;
    }
  }

  const setSlideInterval = () => {
    const SLIDE_INTERVAL_TIME = 25;
    const SLIDE_TIME = 100;
    return setInterval(() => {
      newClipTime += SLIDE_TIME;
      let newClipEndPx = common.timeToPx(newClipTime + common.getClipLength(clip));
      if (newClipEndPx > tableWidth) {
        tableDiv.style.width = `${newClipEndPx}px`;
      }

      document.body.scrollLeft += common.timeToPx(SLIDE_TIME);
      this.updateClip(clipId, trackNum, newTrackNum, newClipTime);
    }, SLIDE_INTERVAL_TIME);
  };

  if (newClipTime >= common.pxToTime(document.body.scrollLeft + bodyWidth) - common.getClipLength(clip)) {
    newClipTime = common.pxToTime(document.body.scrollLeft + bodyWidth) - common.getClipLength(clip);

    if (!slidingClip && newTrackNum === trackNum) {
      slidingClip = setSlideInterval();
    }
  } else {
    if (slidingClip) {
      clearInterval(slidingClip);
      slidingClip = false;
    }
  }

  this.setState({
    pos,
    dragging: { clipId, trackNum: newTrackNum },
    lastSeen,
    slidingClip
  });

  if (clip.startTime === newClipTime
    && newTrackNum === trackNum) return;

  this.updateClip(clipId, trackNum, newTrackNum, newClipTime);

}

/* HELPERS */
function isWindow(obj) {
  return obj != null && obj === obj.window;
}

function getWindow(elem) {
  return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
}

function offset(elem) {
  let docElem;
  let win;
  let box = { top: 0, left: 0 };
  let doc = elem && elem.ownerDocument;

  docElem = doc.documentElement;

  if (typeof elem.getBoundingClientRect !== typeof undefined) {
    box = elem.getBoundingClientRect();
  }

  win = getWindow(doc);
  return {
    top: box.top + win.pageYOffset - docElem.clientTop,
    left: box.left + win.pageXOffset - docElem.clientLeft
  };
}

function getClipId(elem) {
  if (!elem) return null;
  return elem.id.split('clip-component-')[1];
}

function getClipTrackNum(elem) {
  if (!elem) return null;
  return elem.dataset.track;
}
