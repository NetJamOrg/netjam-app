import React from 'react';

export const Table = (props) => (
  <div>
    <h3>I am a table</h3>
    <h4>The num of tracks is { Object.keys(props.table).length } </h4>
    <h4>The num of clips is { Object.keys(props.clips).length } </h4>
  </div>
);

Table.propTypes = {
  table: React.PropTypes.object.isRequired,
  clips: React.PropTypes.object.isRequired
};

export default Table;
