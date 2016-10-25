import { injectReducer } from '../../store/reducers';

export default (store) => ({
    path: 'projects/:id',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
          const Project = require('./components/ProjectView').default;

          cb(null, Project);

        }, 'project');
    }
  });
