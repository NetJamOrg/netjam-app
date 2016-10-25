import React from 'react';

import Table from '../containers/TableContainer';
import './ProjectView.scss';

export const ProjectView = (props) => (
    <div>
	    <h1>Welcome to View for Project { props.params.id }!</h1>
	    <Table />
	  </div>
  );

export default ProjectView;
