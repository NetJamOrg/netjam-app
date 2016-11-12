import { connect } from 'react-redux';

import Table from '../components/Table';
import { updateClip } from '../actions/TrackActions';
import { resizeTable } from '../actions/TableActions';

const mapDispatchToProps = {
  updateClip,
};

const mapStateToProps = (state) => ({
  numTracks: Object.keys(state.tracks).length,
  tracks: state.tracks,
  timeInterval: state.table.timeInterval,
  timeSig: state.table.timeSig,
  tempo: state.table.tempo,
  numMeasures: state.table.numMeasures
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
