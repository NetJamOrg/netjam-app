import React from 'react';

import './Track.scss';

import ClipContainer from '../containers/ClipContainer';

export const Table = (props) => (
  <div className="track-component">
    { createClips(props) }
  </div>
);

/* Presentational Functions */
function createClips(props) {
  console.log('createClips props', props);
  return Object.keys(props.track.clips).map((clipId) => <ClipContainer clip={props.track.clips[clipId]} key={ clipId }/>);
}

export default Table;
