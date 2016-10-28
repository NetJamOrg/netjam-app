import React from 'react';

import './Table.scss';

export const Table = (props) => (
  <div id="table-component">
    { Object.keys(props.table).reduce((previous, currTrack) => {
        console.log('currTrack', currTrack, props.table[currTrack]);
        previous.push(
          <div className="track" key={ currTrack }>
            { Object.keys(props.table[currTrack]).reduce((previous, currTime, i) => {
                //if (i % 2 !== 0) return previous;
                previous.push(
                    <h3>K:FDLK:ASLDK</h3>
                  );
                return previous;
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
