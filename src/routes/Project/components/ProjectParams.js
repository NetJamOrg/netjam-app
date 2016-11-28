import React, { Component } from 'react';

import './ProjectParams.scss';

import ProjectConstants from '../constants';

import common from 'common';

export default class ProjectParams extends Component {
  constructor(props) {
    super(props);
    this.handleTimeDivChange = this.handleTimeDivChange.bind(this);
    this.handleTimeSigChange = this.handleTimeSigChange.bind(this);
    this.handleTempoChange =   this.handleTempoChange.bind(this);
  }

  // not supported yet
  handleTempoChange(event) {
    let val = Number(event.target.value);
    if (2 <= val && val <= 32)
      this.props.updateTempo(val);
    event.preventDefault();
    event.stopPropagation();
  }

  // not supported yet
  handleTimeSigChange(event) {
    let val = Number(event.target.value);
    if (2 <= val && val <= 32)
      this.props.updateTimeSig(val);
    event.preventDefault();
    event.stopPropagation();
  }

  handleTimeDivChange(event) {
    let val = Number(event.target.value);
    if (2 <= val && val <= 32)
      this.props.updateTimeDiv(val);
    event.preventDefault();
    event.stopPropagation();
  }

  render() {
    return (
      <div className='project-params' id='params-component'>
        <div className='tempo-selector param'>
          <div className='input-group'>
            <span className='input-group-addon'>Tempo</span>
            <input type='number' className='form-control param-input' min={80} max={300} disabled
                          onChange={this.handleTempoChange} value={this.props.tempo}/>
          </div>
        </div>

        <div className='time-sig-selector param'>
          <div className='input-group'>
            <span className='input-group-addon'>Time Signature</span>
            <input type='number' className='form-control param-input' min={3} max={40} disabled
                          onChange={this.handleTimeSigChange} value={this.props.timeSig}/>
          </div>
        </div>

        <div className='time-div-selector param'>
          <div className="input-group">
            <span className='input-group-addon'>Time Divisions</span>
            <select className='form-control param-input' onChange={this.handleTimeDivChange} value={this.props.timeInterval}>
              <option value={ 2}>Sixteenth</option>
              <option value={ 4}>Eighth</option>
              <option value={ 8}>Quarter</option>
              <option value={16}>Half</option>
              <option value={32}>Whole</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}
