import React from 'react';

import './Clip.scss';

import ProjectConstants from '../constants';

export const Clip = (props) => (
  <div className="clip-component" id= { `#${props.clip.id}` } style={ clipStyle(props) }>

  </div>
);

/* Styles Functions */
function clipStyle(props) {
  console.log('clipStyle props', props);
  return {
    left: `${timeToPx(props.clip.startTime)}px`,
    width: `${getClipWidth(props.clip)}px`
  };
}

export default Clip;

/* HELPERS */
function timeToPx(time) {
  return time / ProjectConstants.MS_PER_PIXEL;
}

function getClipWidth(clip) {
  return timeToPx(clip.endTime - clip.startTime);
}
