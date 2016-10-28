import React from 'react';
import * as lib from '../../../lib';

import './Toolbar.scss';

export const Toolbar = (props) => (
    <div id="toolbar-component">
      <button>Add Track</button>
      <button onClick={ () => addClip(props) }>Add Clip</button>
    </div>
);

Toolbar.propTypes = {

};

export default Toolbar;

/* OnClick Functions */
function addClip(props) {
  var clip = generateClip();
  props.addClip(clip);
  props.addClipToTrack(clip);
}

/* HELPERS */
// TODO (Daniel Yakobian): Remove after testing
function generateClip() {
  let start = {};
  start.x = lib.getRandomIntInclusive(0, 120000);
  start.y = lib.getRandomIntInclusive(0, 4);

  let end = {};
  end.x = lib.getRandomIntInclusive(start.x, 125000);
  end.y = start.y;

  const id = lib.uuid();
  const clip = { start, end, id };

  return clip;
}
