const db = require('./db');

const Query = {
  company: (root, {id}) => db.companies.get(id),
  job: (root, {id}) => db.jobs.get(id), // pass gql args, parent val and args(the args from the gql query). return the specified job from the db using the id from args
  jobs: () => db.jobs.list(), // return arr of jobs from db  
};

const Mutation = {
  createJob: (root, {input}, {user}) => {
    if (!user) {
      throw new Error("Unauthorized ");
    }
    const id = db.jobs.create({...input, companyId: user.companyId});  // create new job
    return db.jobs.get(id);
  }
};

const Job = {
  company: (job) => db.companies.get(job.companyId) // return a company whose id is the same as the company id of this job
};

const Company = {
  jobs: (company) => db.jobs.list()
                            .filter((job) => job.companyId === company.id)
};

module.exports = { Query, Job, Company, Mutation };
