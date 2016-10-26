import { connect } from 'react-redux';
import { addClipToTrack } from '../actions/TableActions';
import { addClip } from '../actions/ClipActions';

import Toolbar from '../components/Toolbar';

const mapDispatchToProps = {
  addClipToTrack,
  addClip
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
