import { connect } from 'react-redux';

import Table from '../components/Table';

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
  table: state.table,
  clips: state.clips
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
