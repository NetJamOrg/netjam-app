import React from 'react';

import './Table.scss';

import TrackContainer from '../containers/TrackContainer';

export const Table = (props) => (
  <div id="table-component">
    { createTracks(props) }
  </div>
);

Table.propTypes = {
  // table: React.PropTypes.number.isRequired
};

/* Presentation Generation */
function createTracks(props) {
  let tracks = [];
  for (let i = 0; i < props.table; i++) {
    tracks.push(<TrackContainer key={ i } trackNum={ i }/>);
  }

  return tracks;
}

export default Table;
