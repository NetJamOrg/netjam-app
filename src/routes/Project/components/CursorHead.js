import React, { Component } from 'react';

import common from 'common';

import ProjectConstants from '../constants';

import './CursorHead.scss';

// File globals
let tableElem;
let headerElem;
let toolbarElem;

export default class CursorHead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorHeadPosition: false,
      draggingPlayHead: false
    };

    this.onWindowMouseMove = this.onWindowMouseMove.bind(this);
    this.onTableMouseDown = this.onTableMouseDown.bind(this);
    this.onTableMouseUp = this.onTableMouseUp.bind(this);
  }

  componentDidMount() {
    tableElem = document.getElementById('table-component');
    toolbarElem = document.getElementById('toolbar-component');
    headerElem = document.getElementById('header-component');

    window.addEventListener('mousemove',
      _.throttle(this.onWindowMouseMove, ProjectConstants.CURSOR_HEAD_THROTTLE), false);
    tableElem.addEventListener('mousedown', this.onTableMouseDown, false);
    tableElem.addEventListener('mouseup', this.onTableMouseUp, false);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove',
      _.throttle(this.onWindowMouseMove, ProjectConstants.CURSOR_HEAD_THROTTLE), false);
    tableElem.removeEventListener('mousedown', this.onTableMouseDown, false);
    tableElem.removeEventListener('mouseup', this.onTableMouseUp, false);
  }

  onWindowMouseMove(e) {
    if (common.isContextMenuOpen()) return;

    const inBoundsOfHeader = common.isInBounds(common.getBounds(headerElem), e.pageX, e.pageY);
    const inBoundsOfToolbar = common.isInBounds(common.getBounds(toolbarElem), e.pageX, e.pageY);
    const inBounds = !(inBoundsOfHeader || inBoundsOfToolbar);
    if (this.props.clipMoving || this.state.draggingPlayHead || !inBounds) {
      return this.setState({
        cursorHeadPosition: null
      });
    }

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
