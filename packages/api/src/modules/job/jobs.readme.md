## Sample gql

### Register/login
```
mutation  {
  register (data:{
    firstName: "J"
    lastName:"S"
    email:"a@example.com"
    password:"12345678"
  }) {
    user {id}
    token
  }
}

```
```
mutation  {
  register (data:{
    firstName: "J"
    lastName:"S"
    email:"a@example.com"
    password:"12345678"
  }) {
    user {id}
    token
  }
}

```
Take the token and use the http headers

### CRUD
```
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlZmY2MzFlLWQ4Y2QtNDc3YS05MTc3LTJhZTlkY2ZmMzM4ZSIsImlhdCI6MTU4OTczNzQ0NSwiZXhwIjoxNTkyMTU2NjQ1LCJhdWQiOlsiQGV4YW1wbGUvYXBwIiwiQGV4YW1wbGUvd2ViIl0sImlzcyI6IkBleGFtcGxlL2FwaSJ9.1USuCkVIWkfhEjvrm7WtQIQxFZNgDZfY6nHVbwnovxU"
}

```
```
query {
  getJobs {
    id
    jobName
    author {
      firstName
    }
  }
}

```
```
mutation {
  createJob(data:{
    jobName:"first job name"
  }) {
    id
    createdAt
    jobName
    author {
      id
      firstName
    }
  }
}
```
```
mutation {
  updateJob(
    jobId: "11a5b949-3fa6-4ff3-8248-0109ec43bf34",
    data:{
    jobName:"first job updated 2"
  }) {
    createdAt
    updatedAt
    jobName
		author {
      firstName
    }
  }
}
```
```
mutation {
  destroyJob(jobId:"11a5b949-3fa6-4ff3-8248-0109ec43bf34")
}
```
