import { connect } from 'react-redux';
import { addTrack, removeTrack } from '../actions/TableActions';
import { addClip } from '../actions/ClipActions';

import Toolbar from '../components/Toolbar';

const mapDispatchToProps = {
  addTrack,
  removeTrack,
  addClip
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
