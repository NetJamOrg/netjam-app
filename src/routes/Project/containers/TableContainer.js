import { connect } from 'react-redux';

import Table from '../components/Table';
import { updateClip, duplicateClip, dragDuplicateClip, deleteClip } from '../actions/TrackActions';

const mapDispatchToProps = {
  updateClip,
  duplicateClip,
  dragDuplicateClip,
  deleteClip
};

const mapStateToProps = (state) => ({
  numTracks: Object.keys(state.tracks).length,
  tracks: state.tracks
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
