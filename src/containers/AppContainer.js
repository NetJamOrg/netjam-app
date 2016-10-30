import React, { Component, PropTypes } from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';

class AppContainer extends Component {
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
    // only left mouse button
    if (e.button !== 0) return;
    let elem = this.componentDiv;
    let pos = offset(elem);
    this.setState({
      dragging: true,
      rel: {
        x: e.pageX - pos.left,
        y: e.pageY - pos.top
      }
    });
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseUp(e) {
    this.setState({ dragging: false });
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseMove(e) {
    if (!this.state || !this.state.dragging) return;

    this.setState({
      pos: {
        x: e.pageX - this.state.rel.x,
        y: e.pageY - this.state.rel.y
      }
    });
    e.stopPropagation();
    e.preventDefault();
  }

  updateClip() {
    console.log('Clip.updateTrack props');
    let newClip = { ...this.props.clip };
    newClip.endTime += 100;
    newClip.startTime += 100;
    props.updateClip(props.clip, newClip);
  }

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const { routes, store } = this.props;

    return (
      <Provider store={store}>
        <div ref={(input) => this.componentDiv = input}
             style={{ height: '100%' }}
             onMouseMove={ (e) => this.onMouseMove(e) }
             onMouseDown={ (e) => this.onMouseDown(e) }
             onMouseUp={ (e) => this.onMouseUp(e) } >
          <Router history={browserHistory} children={routes} />
        </div>
      </Provider>
    );
  }
}

AppContainer.propTypes = {
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default AppContainer;

/* HELPERS */
function isWindow(obj) {
  return obj != null && obj === obj.window;
}

function getWindow(elem) {
  return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
}

function offset(elem) {

  let docElem, win,
    box = { top: 0, left: 0 },
    doc = elem && elem.ownerDocument;

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

