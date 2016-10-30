import React from 'react';

import './ProjectView.scss';

import Table from '../containers/TableContainer';
import Toolbar from '../containers/ToolbarContainer';

export const ProjectView = (props) => (
  <div id="project-view-component">
    <Table />
    <Toolbar/>
  </div>
);

export default ProjectView;
