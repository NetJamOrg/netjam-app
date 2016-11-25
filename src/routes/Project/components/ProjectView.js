import React from 'react';

import './ProjectView.scss';

import Table from '../containers/TableContainer';
import Toolbar from '../containers/ToolbarContainer';
import ProjectParams from '../containers/ProjectParamsContainer';

export const ProjectView = (props) => (
  <div id="project-view-component">
    <ProjectParams />
    <Table />
    <Toolbar/>
  </div>
);

export default ProjectView;
