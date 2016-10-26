import React from 'react';

import './Table.scss';

export const Table = (props) => (
  <div id="table-component">
  </div>
);

Table.propTypes = {
  table: React.PropTypes.object.isRequired,
  clips: React.PropTypes.object.isRequired
};

export default Table;
