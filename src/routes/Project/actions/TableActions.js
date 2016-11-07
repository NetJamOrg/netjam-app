import ProjectConstants from '../constants';


export function resizeTable(newWidth) {
  console.log('resizing table');
  return {
    type: ProjectConstants.RESIZE_TABLE,
    payload: newWidth
  };
}


export const actions = {
  resizeTable
};
