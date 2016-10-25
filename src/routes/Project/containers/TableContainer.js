import { connect } from 'react-redux';
import { addClipToTrack } from '../actions/TableActions';
import { addClip } from '../actions/ClipActions';

import Table from '../components/Table';

const mapDispatchToProps = {
  addClipToTrack,
  addClip
};

const mapStateToProps = (state) => ({
  table: state.table
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
