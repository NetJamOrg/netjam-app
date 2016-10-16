import React from 'react'

import Table from './Table'
import './ProjectView.scss'

export const ProjectView = (props) => {
	console.log (props);

	return (
	  <div>
	    <h1>Welcome to View for Project { props.params.id }!</h1>
	    <Table />
	  </div>
	)
};

export default ProjectView
