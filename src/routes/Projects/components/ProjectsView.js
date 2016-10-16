import React from 'react'

import ProjectsList from './ProjectsList'
import './ProjectsView.scss'

export const ProjectsView = (props) => {
	console.log (props);

	return (
	  <div>
	    <h1>Welcome to View for Projects View Page! Here are your projects</h1>
	    <ProjectsList />
	  </div>
	)
};

export default ProjectsView
