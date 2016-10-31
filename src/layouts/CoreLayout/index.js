import { injectReducer } from '../../store/reducers';

import CoreLayout from './CoreLayoutContainer';

export default (store) => {

  const reducer = require('../../routes/Project/reducers/ClipsReducer').default;

  injectReducer(store, { key: 'clipsMap', reducer });

  return CoreLayout;
};

