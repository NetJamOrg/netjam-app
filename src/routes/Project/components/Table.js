import React from 'react';

import './Table.scss';

export const Table = (props) => (
  <div id="table-component">
    { Object.keys(props.table).reduce((previous, currTrack) => {
        previous.push(
          <div className="track">
            { Object.keys(props.table[currTrack]).reduce((previous, currTime, i) => {
                if (i % 2 !== 0) return previous;
                previous.push(
                  <h3>props.table[currTrack][currTime].id</h3>
                );
              }, [])
            }
          </div>
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
