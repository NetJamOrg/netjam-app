import React from 'react';

import './Toolbar.scss';

export const Toolbar = (props) => (
    <div id="toolbar-component">
      <button>Add Track</button>
      <button onClick={props.addClip}>Add Clip</button>
    </div>
);

Toolbar.propTypes = {

};


export default Toolbar;
