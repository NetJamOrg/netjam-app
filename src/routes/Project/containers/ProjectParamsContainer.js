import { connect } from 'react-redux';

import ProjectParams from '../components/ProjectParams';
import { updateTempo, updateTimeSig, updateTimeDiv } from '../actions/TableActions';

const mapDispatchToProps = {
  updateTempo,
  updateTimeSig,
  updateTimeDiv
};

const mapStateToProps = (state) => ({
  timeInterval: state.table.timeInterval,
  timeSig: state.table.timeSig,
  tempo: state.table.tempo,
  numMeasures: state.table.numMeasures
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectParams);
