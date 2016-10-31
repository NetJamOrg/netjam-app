import { connect } from 'react-redux';
import { addTrack, removeTrack } from '../actions/TrackActions';
import { incrementTracks, decrementTracks } from '../actions/TableActions';
import { addClipToTrack } from '../actions/TrackActions';

import Toolbar from '../components/Toolbar';

const mapDispatchToProps = {
  addTrack,
  removeTrack,
  incrementTracks,
  decrementTracks,
  addClipToTrack
};

const mapStateToProps = (state) => ({
  numTracks: state.tracks.length
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
