import React from 'react';

import './Track.scss';

import ClipContainer from '../containers/ClipContainer';

export const Track = (props) => (
  <div className="track-component" id={ `track-component-${props.trackNum}`}>
    { createClips(props) }
  </div>
);

/* Presentational Functions */
function createClips(props) {
  return Object.keys(props.track.clips)
    .map((clipId) =>
      <ClipContainer
        clip={props.track.clips[clipId]} key={ clipId }
        isSelected={ props.selectedClips[clipId] } />);
}

export default Track;
