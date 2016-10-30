import { connect } from 'react-redux';

import Track from '../components/Track';

const mapDispatchToProps = {

};

const mapStateToProps = (state, ownProps) => ({
  track: state.tracks[ownProps.trackNum]
});

export default connect(mapStateToProps, mapDispatchToProps)(Track);
