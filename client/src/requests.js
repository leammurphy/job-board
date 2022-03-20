
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "apollo-boost";
import gql from 'graphql-tag'; // parse strings into objects
import { getAccessToken, isLoggedIn } from "./auth";

const endpointURL = 'http://localhost:9000/graphql';

const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    // request.headers['authorization'] = 'Bearer ' + getAccessToken();
    operation.setContext({
      headers: {
        'authorization': 'Bearer ' + getAccessToken()
      }
    })
  }
  return forward(operation);
})

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    new HttpLink({uri: endpointURL})
  ]),
  cache: new InMemoryCache() // one of the main features of ApolloClient, caching is good bc it avoids making more calls to the server than it needs to 
});

export async function createJob(input) {
  const mutation = gql`mutation CreateJob($input: CreateJobInput){
    job: createJob(input: $input) {
      id
      title
      company {
        name
        id
      }
    }
  }`;
  const {data: {job}} = await client.mutate({mutation, variables: {input}})
  return job;
}

export async function loadCompany(id) {
  const query = gql`query CompanyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }`;
  const {data: {company}} = await client.query({query, variables: {id}})
  return company;
}


export async function loadJob(id) {
  const query = gql`query JobQuery($id: ID!) {  
    job(id: $id) {
      id
      title
      company {
        id
        name
      }
      description
    }
  }`;
  const {data: {job}} = await client.query({query, variables: {id}})
  return job;
}

export async function loadJobs() { // call server and fetch jobs data
    const query = gql`{
      jobs {
        id
        title
        company {
          id
          name
        }
      }
    }`
    const {data: {jobs}} = await client.query({query, fetchPolicy: 'no-cache'});
  return jobs;
}

