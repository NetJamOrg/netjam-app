import React from 'react';

import './Clip.scss';

import common from 'common';

export const Clip = (props) => (
  <div className="clip-component"
       id= { `clip-component-${props.clip.id}` }
       data-track={ props.clip.track }
       style={ clipStyle(props) }>

  </div>
);

/* Styles Functions */
function clipStyle(props) {
  // console.log('clipStyle props', props);
  return {
    left: `${common.timeToPx(props.clip.startTime)}px`,
    width: `${common.getClipWidth(props.clip)}px`
  };
}

export default Clip;

/* HELPERS */
