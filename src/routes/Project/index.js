import { injectReducer } from '../../store/reducers';

export default (store) => ({
    path: 'projects/:id',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
          const Project = require('./components/ProjectView').default;

          const trackReducer = require('./reducers/TrackReducer').default;
          const clipsReducer = require('./reducers/ClipsReducer').default;

          injectReducer(store, { key: 'tracks', reducer: trackReducer });
          injectReducer(store, { key: 'clipsMap', reducer: clipsReducer });

          cb(null, Project);

        }, 'project');
    }
  });
