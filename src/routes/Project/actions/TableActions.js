import ProjectConstants from '../constants';

export function updateTempo(tempo) {
  console.log(`updating tempo: ${tempo}`);
  return {
    type: ProjectConstants.UPDATE_TEMPO,
    payload: tempo
  };
};

export function updateTimeSig(sig) {
  console.log(`updating time sig: ${sig}`);
  return {
    type: ProjectConstants.UPDATE_TIME_SIG,
    payload: sig // string
  };
};

export function updateTimeDiv(div) {
  console.log(`updating time div: ${div}`);
  return {
    type: ProjectConstants.UPDATE_TIME_DIV,
    payload: div
  };
}

export const actions = {
  updateTempo,
  updateTimeSig,
  updateTimeDiv
};
