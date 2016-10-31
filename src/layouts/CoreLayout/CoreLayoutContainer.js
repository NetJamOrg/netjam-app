import { connect } from 'react-redux';

import CoreLayout from './CoreLayout';
import { updateClip } from '../../routes/Project/actions/TrackActions';

const mapDispatchToProps = {
  updateClip
};

const mapStateToProps = (state) => ({
  clipsMap: state.clipsMap
});

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
