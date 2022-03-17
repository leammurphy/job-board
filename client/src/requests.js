const endpointURL = 'http://localhost:9000/graphql';

export async function loadJob(id) {
  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      query: `query JobQuery($id: ID!) {  
        job(id: $id) {
          id
          title
          company {
            id
            name
          }
          description
        }
      }`, 
      variables: {id}
      // the above query structure is required when passing a query a dynamic variable
    })
  });
  const responseBody = await response.json();
  return responseBody.data.job;
}

export async function loadJobs() { // call server and fetch jobs data
  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      query: `{
        jobs {
          id
          title
          company {
            id
            name
          }
        }
      }`
    })
  });
  const responseBody = await response.json();
  return responseBody.data.jobs;
}

