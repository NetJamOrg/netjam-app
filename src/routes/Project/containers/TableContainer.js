import { connect } from 'react-redux';

import Table from '../components/Table';

const mapDispatchToProps = {

};

const mapStateToProps = (state, ownProps) => ({
  table: state.table
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
