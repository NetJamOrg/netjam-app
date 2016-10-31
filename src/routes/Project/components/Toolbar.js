import React from 'react';
import * as lib from '../../../lib';

import './Toolbar.scss';

export const Toolbar = (props) => (
    <div id="toolbar-component">
      <button onClick={ () => addTrack(props) }>Add Track</button>
      <button onClick={ props.removeTrack }>Remove Track</button>
      <button onClick={ () => addClip(props) }>Add Clip</button>
    </div>
);

Toolbar.propTypes = {

};

export default Toolbar;

/* OnClick Functions */
function addClip(props) {
  var clip = generateClip(props);
  props.addClipToTrack(clip);
}

function addTrack(props) {
  props.incrementTracks();
  props.addTrack();
}
/* HELPERS */

// TODO (Daniel Yakobian): Remove after testing
function generateClip(props) {
  const id = lib.uuid();
  let track = lib.getRandomIntInclusive(0, props.table - 1);
  let startTime = lib.getRandomIntInclusive(0, 120000);
  let endTime = lib.getRandomIntInclusive(startTime, 125000);

  return { startTime, endTime, track, id };
}
