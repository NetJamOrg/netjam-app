import { injectReducer } from '../../store/reducers';

export default (store) => ({
    path: 'projects/:id',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
          const Project = require('./components/ProjectView').default;

          const clipsReducer = require('./reducers/ClipsReducer').default;
          const tableReducer = require('./reducers/TableReducer').default;

          /*  Add the reducer to the store on key 'counter'  */
          injectReducer(store, { key: 'clips', clipsReducer });
          injectReducer(store, { key: 'table', tableReducer });

          cb(null, Project);

        }, 'project');
    }
  });
