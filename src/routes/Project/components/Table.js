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
      rel: null // position relative to the cursor
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
      }
    });
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseUp(e) {
    const METHOD_NAME = 'onMouseUp';

    if (this.state.dragging) this.setState({ dragging: false });
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseMove(e) {
    const METHOD_NAME = 'onMouseMove';

    moveClip.bind(this)(e);

    e.stopPropagation();
    e.preventDefault();
  }

  updateClip(clipId, trackNum, newStartTime) {
    const METHOD_NAME = 'updateClip';

    let oldClip = this.props.tracks[trackNum].clips[clipId];
    let newClip = { ...oldClip };
    let clipTimeLength = newClip.endTime - newClip.startTime;
    newClip.startTime = newStartTime;
    newClip.endTime = newStartTime + clipTimeLength;
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

  if (!this.state.dragging) return false;

  let pos = {
    x: e.pageX - this.state.rel.x,
    y: e.pageY - this.state.rel.y
  };

  this.setState({
    pos
  });

  let newClipTime = common.pxToTime(pos.x);

  // Don't move clip past start
  if (newClipTime < 0) newClipTime = 0;

  let clipId = this.state.dragging.clipId;
  let trackNum = this.state.dragging.trackNum;
  if (this.props.tracks[trackNum].clips[clipId].startTime === newClipTime) return;

  this.updateClip(clipId, trackNum, newClipTime);

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
  let componentInfo = elem.id.split('clip-component-')[1];
  if (componentInfo) return componentInfo.split('-')[0];
}

function getClipTrackNum(elem) {
  if (!elem) return null;
  let componentInfo = elem.id.split('clip-component-')[1];
  if (componentInfo) return componentInfo.split('-')[1];
}
