import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'projects/:id',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Project = require('./components/ProjectView').default;

      const trackReducer = require('./reducers/TrackReducer').default;
      const tableReducer = require('./reducers/TableReducer').default;

      injectReducer(store, { key: 'tracks', reducer: trackReducer });
      injectReducer(store, { key: 'table',  reducer: tableReducer });
      cb(null, Project);

    }, 'project');
  }
});
