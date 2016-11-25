import React, { Component } from 'react';

import common from 'common';

import ProjectConstants from '../constants';

import './PlayHead.scss';

// File globals
let tableElem;
let toolbarElem;
let headerElem;
let paramsElem;
let lastPos = 0;

export default class PlayHead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playHeadPosition: 0,
      draggingPlayHead: false
    };
  }

  componentDidMount() {
    tableElem = document.getElementById('table-component');
    toolbarElem = document.getElementById('toolbar-component');
    headerElem = document.getElementById('header-component');
    paramsElem = document.getElementById('params-component');

    tableElem.addEventListener('mousedown', this.onTableMouseDown.bind(this), false);
    window.addEventListener('mouseup', this.onWindowMouseUp.bind(this), false);
    window.addEventListener('scroll', this.onWindowScroll.bind(this), false);
    window.addEventListener('mousemove',
      _.throttle(this.onWindowMouseMove.bind(this), ProjectConstants.PLAY_HEAD_MOVE_THROTTLE), false);
  }

  componentWillUnmount() {
    tableElem.removeEventListener('mousedown', this.onTableMouseDown.bind(this), false);
    window.removeEventListener('mouseup', this.onWindowMouseUp.bind(this), false);
    window.removeEventListener('scroll', this.onWindowScroll.bind(this), false);
    window.removeEventListener('mousemove',
      _.throttle(this.onWindowMouseMove.bind(this), ProjectConstants.PLAY_HEAD_MOVE_THROTTLE), false);
  }

  dragHead(x) {
    const bufferPxs = 4;
    const atEndOfTable = x > tableElem.clientWidth - bufferPxs;

    let newX = x;
    if (atEndOfTable) {
      newX = tableElem.clientWidth - bufferPxs;
    } else if (newX < 0) {
      newX = 0;
    }

    this.setState({
      playHeadPosition: newX
    });
  }

  onWindowScroll(e) {
    if (!this.state.draggingPlayHead) return;

    // this logic prevents choppy drag scrolling
    const scrollBufferPxs = 4;
    let currPos = document.body.scrollLeft;
    let isScrollingRight = lastPos < currPos;
    lastPos = currPos;

    if (isScrollingRight) return this.dragHead(document.body.clientWidth + document.body.scrollLeft - scrollBufferPxs);
    return this.dragHead(document.body.scrollLeft);
  }

  onWindowMouseUp(e) {
    if (this.props.clipMoving || common.isContextMenuOpen()) return;

    let newState = {
      draggingPlayHead: false
    };

    const inBoundsOfHeader = common.isInBounds(common.getBounds(headerElem), e.pageX, e.pageY);
    const inBoundsOfToolbar = common.isInBounds(common.getBounds(toolbarElem), e.pageX, e.pageY);
    const inBoundsOfParams = common.isInBounds(common.getBounds(paramsElem), e.pageX, e.pageY);
    const inBounds = !(inBoundsOfHeader || inBoundsOfToolbar || inBoundsOfParams);

    if (inBounds) {
      newState.playHeadPosition = e.pageX;
    }

    this.setState(newState);
  }

  onTableMouseDown(e) {
    if (e.srcElement.id !== 'play-head-component') return;

    this.setState({
      draggingPlayHead: true
    });
  }

  onWindowMouseMove(e) {
    if (!this.state.draggingPlayHead) return;

    this.dragHead(e.pageX);
  }

  render() {
    return (
      <div id="play-head-component" style={ createStyles(this.state) }>
      </div>
    );
  }
}

/* Presentational Functions */
function createStyles(state) {
  return {
    left: `${state.playHeadPosition}px`
  };
}
