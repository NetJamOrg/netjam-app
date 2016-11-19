import React, { Component } from 'react';

import common from 'common';

import ProjectConstants from '../constants';

import './CursorHead.scss';

// File globals
let tableElem;
let toolbarElem;

export default class CursorHead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorHeadPosition: false,
      contextMenuOpen: false,
      draggingPlayhead: false
    };
  }

  componentDidMount() {
    tableElem = document.getElementById('table-component');
    toolbarElem = document.getElementById('toolbar-component');

    window.addEventListener('mousemove', this.onWindowMouseMove.bind(this), false);
    toolbarElem.addEventListener('mousemove', this.onToolbarMouseMove.bind(this), false);
    tableElem.addEventListener('contextmenu', this.onTableContextMenu.bind(this), false);
    tableElem.addEventListener('mouseout', this.onTableMouseOut.bind(this), false);
    tableElem.addEventListener('mousedown', this.onTableMouseDown.bind(this), false);
    tableElem.addEventListener('mouseup', this.onTableMouseUp.bind(this), false);
    tableElem.addEventListener('mousemove',
      _.throttle(this.onTableMouseMove.bind(this), ProjectConstants.CURSOR_HEAD_THROTTLE), false);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onWindowMouseMove.bind(this), false);
    toolbarElem.removeEventListener('mousemove', this.onToolbarMouseMove.bind(this), false);
    tableElem.removeEventListener('contextmenu', this.onTableContextMenu.bind(this), false);
    tableElem.removeEventListener('mouseout', this.onTableMouseOut.bind(this), false);
    tableElem.removeEventListener('mousedown', this.onTableMouseDown.bind(this), false);
    tableElem.removeEventListener('mouseup', this.onTableMouseUp.bind(this), false);
    tableElem.removeEventListener('mousemove',
      _.throttle(this.onTableMouseMove.bind(this), ProjectConstants.CURSOR_HEAD_THROTTLE), false);
  }

  onToolbarMouseMove(e) {
    if (!this.state.cursorHeadPosition) return;

    this.setState({
      cursorHeadPosition: null
    });
  }

  onWindowMouseMove(e) {
    /* this is a hacky way to know if the context menu was closed but onmousedown events don't fire when the regular
    contextmenu is closed, if we only use custom context menus we can switch to mouse down events */

    if (!this.state.contextMenuOpen || common.isContextMenuOpen()) return;

    this.setState({
      contextMenuOpen: false
    });
  }

  onTableMouseMove(e) {
    if (this.state.contextMenuOpen) return;

    if (this.props.clipMoving || this.state.draggingPlayhead) return this.setState({
      cursorHeadPosition: null
    });

    this.setState({
      cursorHeadPosition: e.pageX + 1
    });
  }

  onTableMouseOut(e) {
    if (common.isInBounds(common.getBounds(tableElem), e.pageX, e.pageY)) return;

    this.setState({
      cursorHeadPosition: false
    });
  }

  onTableContextMenu(e) {
    this.setState({
      contextMenuOpen: true
    });
  }

  onTableMouseDown(e) {
    if (e.srcElement.id === 'play-head-component') {
      this.setState({
        draggingPlayhead: true
      });
    }
  }

  onTableMouseUp(e) {
    if (!this.state.draggingPlayhead) return;

    this.setState({
      draggingPlayhead: false
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
