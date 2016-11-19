import React, { Component } from 'react';

import common from 'common';

import ProjectConstants from '../constants';

import './CursorHead.scss';

// File globals
let tableOverlayElem;

export default class CursorHead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorHeadPosition: false,
      draggingPlayHead: false
    };
  }

  componentDidMount() {
    tableOverlayElem = document.getElementById('table-component-overlay');

    window.addEventListener('mousemove',
      _.throttle(this.onWindowMouseMove.bind(this), ProjectConstants.CURSOR_HEAD_THROTTLE), false);
    tableOverlayElem.addEventListener('mousedown', this.onTableMouseDown.bind(this), false);
    tableOverlayElem.addEventListener('mouseup', this.onTableMouseUp.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove',
      _.throttle(this.onWindowMouseMove.bind(this), ProjectConstants.CURSOR_HEAD_THROTTLE), false);
    tableOverlayElem.removeEventListener('mousedown', this.onTableMouseDown.bind(this), false);
    tableOverlayElem.removeEventListener('mouseup', this.onTableMouseUp.bind(this), false);
  }

  onWindowMouseMove(e) {
    if (common.isContextMenuOpen()) return;

    const inBounds = common.isInBounds(common.getBounds(tableOverlayElem), e.pageX, e.pageY);
    if (this.props.clipMoving || this.state.draggingPlayHead || !inBounds) return this.setState({
      cursorHeadPosition: null
    });

    this.setState({
      cursorHeadPosition: e.pageX + 1
    });
  }

  onTableMouseDown(e) {
    if (e.srcElement.id === 'play-head-component') {
      this.setState({
        draggingPlayHead: true
      });
    }
  }

  onTableMouseUp(e) {
    if (!this.state.draggingPlayHead) return;

    this.setState({
      draggingPlayHead: false
    });
  }

  render() {
    return (
      <div id="cursor-head-component" style={ createStyles(this.state) }>
      </div>
    );
  }
}

/* Presentational Functions */
function createStyles(state) {
  return {
    display: state.cursorHeadPosition ? 'initial' : 'none',
    left: `${state.cursorHeadPosition}px`
  };
}
