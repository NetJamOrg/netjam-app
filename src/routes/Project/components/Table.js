import React, { Component } from 'react';

import './Table.scss';

import TrackContainer from '../containers/TrackContainer';

import $log from 'logger';
import common from 'common';

const CLASS_NAME = 'Table';

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
    window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
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
    if (!clipId) return;
    let pos = offset(elem);
    this.setState({
      dragging: clipId,
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

    if (!this.state.dragging) return;

    let pos = {
      x: e.pageX - this.state.rel.x,
      y: e.pageY - this.state.rel.y
    };

    this.setState({
      pos
    });

    let newClipTime = common.pxToTime(pos.x);

    this.updateClip(this.state.dragging, newClipTime);

    e.stopPropagation();
    e.preventDefault();
  }

  updateClip(clipId, newStartTime) {
    const METHOD_NAME = 'updateClip';

    let oldClip = this.props.clipsMap[clipId];
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
};

function getClipId(elem) {
  if (!elem) return null;
  return elem.id.split('clip-component-')[1];
}
