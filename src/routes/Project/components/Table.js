import React, { Component } from 'react';

import './Table.scss';

import TrackContainer from '../containers/TrackContainer';

import $log from 'logger';

const CLASS_NAME = 'Table';

export default class Table extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $log.d(CLASS_NAME, 'componentDidMount', 'Hi', { x: 1 });
  }

  render() {
    return (
      <div id="table-component">
        { createTracks(this.props) }
      </div>
    );
  }
}

Table.propTypes = {
  numTracks: React.PropTypes.number.isRequired
};

/* Presentation Generation */
function createTracks(props) {
  let tracks = [];
  for (let i = 0; i < props.numTracks; i++) {
    tracks.push(<TrackContainer key={ i } trackNum={ i }/>);
  }

  return tracks;
}
