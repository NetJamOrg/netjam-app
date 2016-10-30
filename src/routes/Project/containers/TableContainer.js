import { connect } from 'react-redux';

import Table from '../components/Table';

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
  numTracks: Object.keys(state.tracks).length
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
