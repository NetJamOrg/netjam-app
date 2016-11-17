import React, { Component } from 'react';

import './Clip.scss';

import common from 'common';

export default class Clip extends Component {
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
           style={ clipStyle(this.props) } >
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
