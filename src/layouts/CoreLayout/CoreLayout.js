import React, { Component } from 'react';
import * as lib from '../../lib';
import Header from '../../components/Header';
import './CoreLayout.scss';
import '../../styles/core.scss';

export default class CoreLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: this.props.initialPos,
      dragging: false,
      rel: null // position relative to the cursor
    };
  }

  /*  we could get away with not having this (and just having the listeners on
   our div), but then the experience would be possibly be janky. If there's
   anything w/ a higher z-index that gets in the way, then you're toast,
   etc.*/
  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  }

  // calculate relative position to the mouse and set dragging=true
  onMouseDown(e) {
    if (!this.state) return;

    // only left mouse button
    if (e.button !== 0) return;
    let elem = e.nativeEvent.srcElement;
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
    if (!this.state) return;

    if (this.state.dragging) this.setState({ dragging: false });
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseMove(e) {

    if (!this.state || !this.state.dragging) return;

    let pos = {
      x: e.pageX - this.state.rel.x,
      y: e.pageY - this.state.rel.y
    };

    this.setState({
      pos
    });

    // console.log(pos);

    let newClipTime = lib.pxToTime(pos.x);

    // console.log(newClipTime, this.state.rel.x);
    this.updateClip(this.state.dragging, newClipTime);

    e.stopPropagation();
    e.preventDefault();
  }

  updateClip(clipId, newStartTime) {
    // console.log('upldateClip', clipId, newStartTime);
    let oldClip = this.props.clipsMap[clipId];
    let newClip = { ...oldClip };
    let clipTimeLength = newClip.endTime - newClip.startTime;
    newClip.startTime = newStartTime;
    newClip.endTime = newStartTime + clipTimeLength;
    this.props.updateClip(oldClip, newClip);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    console.log('Rendering corelayout');
    return (
      <div id="core-layout-component" className='text-center'
           onMouseMove={ (e) => this.onMouseMove(e) }
           onMouseDown={ (e) => this.onMouseDown(e) }
           onMouseUp={ (e) => this.onMouseUp(e) }>
        <Header />
        <div className='core-layout__viewport'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

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

