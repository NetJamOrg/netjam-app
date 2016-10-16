export default (store) => ({
    path: 'projects',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Projects = require('./components/ProjectsView').default


            cb(null, Projects)

        }, 'projects')
    }
})
