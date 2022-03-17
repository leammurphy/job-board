const db = require('./db');

const Query = {
  jobs: () => db.jobs.list() // return arr of jobs from db
};

module.exports = { Query };
