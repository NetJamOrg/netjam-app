import { injectReducer } from '../../store/reducers';

export default (store) => ({
    path: 'projects/:id',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
          const Project = require('./components/ProjectView').default;

          const trackReducer = require('./reducers/TrackReducer').default;

          /*  Add the reducer to the store on key 'counter'  */
          injectReducer(store, { key: 'tracks', reducer: trackReducer });

          cb(null, Project);

        }, 'project');
    }
  });
