import { connect } from 'react-redux';
import { addTrack, removeTrack, addClipToTrack } from '../actions/TrackActions';
import { addClipToMap } from '../actions/ClipActions';

import Toolbar from '../components/Toolbar';

const mapDispatchToProps = {
  addTrack,
  removeTrack,
  addClipToTrack,
  addClipToMap
};

const mapStateToProps = (state) => ({
  numTracks: state.tracks.length
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
