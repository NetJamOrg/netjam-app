import React from 'react';

import Toolbar from '../containers/ToolbarContainer';
import './Table.scss';

export const Table = (props) => (
  <div id="table-component">
    { Object.keys(props.table).reduce((previous, currTrack) => {
        previous.push(
          <div className="track">track { currTrack }</div>
        );
        return previous;
      }, [])
    }
    <Toolbar/>
  </div>
);

Table.propTypes = {
  table: React.PropTypes.object.isRequired,
  clips: React.PropTypes.object.isRequired
};

export default Table;
