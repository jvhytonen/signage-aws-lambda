# Backend for my digital signage -project. 

The visible part: https://github.com/jvhytonen/flight-data-app

Here are all functions stored in AWS Lambda. The client connects the backend via API Gateway and then the backend does
what it needs to. 

## what does it do?

It will fetch all the data needed for the client (digital signage) and shapes the data so that the client mainly needs only to show it.

Used APIs:
Newsapi.org, airlabs.co, visualcrossing.com -weather API, digitransit.fi (for Helsinki public transport).

### How can I use this?

You can't. The code is in the cloud and it needs the serverless environment to work. This is just a sample repo to show the code. 

### 

For the front end (the real signage with data) see: https://github.com/jvhytonen/flight-data-app
