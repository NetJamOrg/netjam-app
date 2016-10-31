import React from 'react';

import './Clip.scss';

import ProjectConstants from '../constants';

export const Clip = (props) => (
  <div className="clip-component" onClick={ () => updateClip(props) } style={ clipStyle(props) }>

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

/* OnClick functions */
function updateClip(props) {
  console.log('Clip.updateTrack props', props);
  let newClip = { ...props.clip };
  newClip.endTime += 100;
  newClip.startTime += 100;
  props.updateClip(props.clip, newClip);
}

export default Clip;

/* HELPERS */
function timeToPx(time) {
  return time / ProjectConstants.MS_PER_PIXEL;
}

function getClipWidth(clip) {
  return timeToPx(clip.endTime - clip.startTime);
}
