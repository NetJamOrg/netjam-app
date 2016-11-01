import { connect } from 'react-redux';

import Table from '../components/Table';
import { updateClip } from '../actions/TrackActions';

const mapDispatchToProps = {
  updateClip
};

const mapStateToProps = (state) => ({
  numTracks: Object.keys(state.tracks).length,
  clipsMap: state.clipsMap
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
