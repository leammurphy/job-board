import React, { Component } from 'react';
import { JobList } from './JobList';
import { loadJobs } from './requests';


export class JobBoard extends Component {
  // make stateful by keeping jobs data in the state
  constructor(props) {
    super(props);
    this.state = {jobs: []}; // initialize state
  }

  async componentDidMount() {  // load data from server in DidMoint lifecycle method
    const jobs = await loadJobs();
    this.setState({jobs}); // update component state
  }

  render() {
    const {jobs} = this.state; // get jobs data from components state 
    return (
      <div>
        <h1 className="title">Job Board</h1>
        <JobList jobs={jobs} />
      </div>
    );
  }
}
