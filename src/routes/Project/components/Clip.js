import React from 'react';

import './Clip.scss';

import * as lib from '../../../lib';

export const Clip = (props) => (
  <div className="clip-component" id= { `clip-component-${props.clip.id}` } style={ clipStyle(props) }>

  </div>
);

/* Styles Functions */
function clipStyle(props) {
  // console.log('clipStyle props', props);
  return {
    left: `${lib.timeToPx(props.clip.startTime)}px`,
    width: `${lib.getClipWidth(props.clip)}px`
  };
}

export default Clip;

/* HELPERS */
