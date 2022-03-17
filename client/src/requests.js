const endpointURL = 'http://localhost:9000/graphql';

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

