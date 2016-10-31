import { connect } from 'react-redux';

import Clip from '../components/Clip';
import { updateClip } from '../actions/TrackActions';

const mapDispatchToProps = {
  updateClip
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Clip);
