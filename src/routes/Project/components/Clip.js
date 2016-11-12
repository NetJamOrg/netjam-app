import React, { Component } from 'react';

import './Clip.scss';

import common from 'common';

export default class Clip extends Component {
  addMenu(x, y) {
    let clipMenu = document.getElementById('clip-menu');
    clipMenu.style.left = common.numToPx(x);
    clipMenu.style.top = common.numToPx(y);
    clipMenu.dataset.clipId = this.props.clip.id;
    clipMenu.dataset.track = this.props.clip.track;
    clipMenu.style.display = 'flex';
  }

  handleContextMenu(e) {
    e.preventDefault();
    this.addMenu(e.clientX, e.clientY);
  }

  componentDidMount() {
    let table = document.getElementById('table-component');
    let endPx = common.timeToPx(this.props.clip.endTime);

    if (endPx > table.clientWidth) {
      table.style.width = common.numToPx(endPx);
      if (table.clientWidth - document.body.clientWidth > document.body.scrollLeft) {
        document.body.scrollLeft = table.clientWidth - document.body.clientWidth;
      }
    }
  }

  render() {
    const className = `clip-component ${this.props.clip.ghostClip ? 'ghost-clip' : ''}`;
    return (
      <div className={ className }
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
