import { injectReducer } from '../../store/reducers';

export default (store) => ({
    path: 'projects/:id',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
          const Project = require('./components/ProjectView').default;

          const clipsReducer = require('./reducers/ClipsReducer').default;
          const tableReducer = require('./reducers/TableReducer').default;
          const trackReducer = require('./reducers/TrackReducer').default;

          /*  Add the reducer to the store on key 'counter'  */
          injectReducer(store, { key: 'clips', reducer: clipsReducer });
          injectReducer(store, { key: 'tracks', reducer: trackReducer });
          injectReducer(store, { key: 'table', reducer: tableReducer });

          cb(null, Project);

        }, 'project');
    }
  });
