import React, { Component } from 'react';

import './Clip.scss';

import common from 'common';

export default class Clip extends Component {
  addMenu(x, y) {
    let clipMenu = document.getElementById('clip-menu');
    clipMenu.style.left = common.numToPx(x);
    clipMenu.style.top = common.numToPx(y);
    clipMenu.style.display = 'initial';
  }

  handleContextMenu(e) {
    e.preventDefault();
    this.addMenu(e.clientX, e.clientY);
  }

  render() {
    return (
      <div className="clip-component"
           id={ `clip-component-${this.props.clip.id}` }
           data-track={ this.props.clip.track }
           style={ clipStyle(this.props) }
           onContextMenu={ this.handleContextMenu.bind(this) }>
      </div>
    );
  }
}

/* Styles Functions */
function clipStyle(props) {
  // console.log('clipStyle props', props);
  return {
    left: `${common.timeToPx(props.clip.startTime)}px`,
    width: `${common.getClipWidth(props.clip)}px`
  };
}

/* HELPERS */
