import React from 'react';

import './Table.scss';

export const Table = (props) => (
  <div id="table-component">
    { Object.keys(props.table).reduce((previous, currTrack) => {
        previous.push(
          <div className="track"></div>
        );
        return previous;
      }, [])
    }
  </div>
);

Table.propTypes = {
  table: React.PropTypes.object.isRequired,
  clips: React.PropTypes.object.isRequired
};

export default Table;
