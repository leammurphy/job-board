const db = require('./db');

const Query = {
  jobs: () => db.jobs.list(), // return arr of jobs from db
};

const Job = {
  company: (job) => db.companies.get(job.companyId) // return a company whose id is the same as the company id of this job
};

module.exports = { Query, Job };
