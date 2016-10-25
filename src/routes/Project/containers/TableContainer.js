import { connect } from 'react-redux';
import { addClip } from '../actions/TableActions';

import Table from '../components/Table';

const mapDispatchToProps = {
  addClip
};

const mapStateToProps = (state) => ({
  table: state.table
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
