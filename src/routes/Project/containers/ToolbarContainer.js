import { connect } from 'react-redux';
import { addTrack, removeTrack, addClipToTrack } from '../actions/TrackActions';

import Toolbar from '../components/Toolbar';

const mapDispatchToProps = {
  addTrack,
  removeTrack,
  addClipToTrack
};

const mapStateToProps = (state) => ({
  numTracks: state.tracks.length
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
