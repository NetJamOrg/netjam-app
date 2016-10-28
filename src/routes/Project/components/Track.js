import React from 'react';

import './Track.scss';

import Clip from './Clip';

export const Table = (props) => (
  <div className="track-component">
    { createClips(props) }
  </div>
);

/* Presentational Functions */
function createClips(props) {
  console.log('createClips props', props);
  return Object.keys(props.track.clips).map((clipId) => <Clip clipId={clipId} key={ clipId }/>);
}

export default Table;
