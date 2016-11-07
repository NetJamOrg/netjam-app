import { connect } from 'react-redux';

import Table from '../components/Table';
import { updateClip } from '../actions/TrackActions';
import { resizeTable } from '../actions/TableActions';

const mapDispatchToProps = {
  updateClip,
  resizeTable
};

const mapStateToProps = (state) => ({
  numTracks: Object.keys(state.tracks).length,
  tracks: state.tracks,
  widthPx: state.table.widthPx
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
