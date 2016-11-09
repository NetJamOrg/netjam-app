import { connect } from 'react-redux';

import Table from '../components/Table';
import { updateClip, duplicateClip } from '../actions/TrackActions';

const mapDispatchToProps = {
  updateClip,
  duplicateClip
};

const mapStateToProps = (state) => ({
  numTracks: Object.keys(state.tracks).length,
  tracks: state.tracks
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
