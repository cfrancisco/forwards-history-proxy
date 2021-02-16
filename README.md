# GUI Proxy [![CodeFactor](https://www.codefactor.io/repository/github/cfrancisco/gui_v1_proxy/badge)](https://www.codefactor.io/repository/github/cfrancisco/gui_v1_proxy) [![codecov](https://codecov.io/gh/cfrancisco/gui_v1_proxy/branch/development/graph/badge.svg)](https://codecov.io/gh/cfrancisco/gui_v1_proxy) [![License badge](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)


The GUI Proxy allows the Dojot GUI v1 to be compliant with InfluxDb, which is used in newer versions of Dojot.


## Use cases:
The service was tested (i.e., yielded the same results and patterns) in the following scenarios:
-> Requesting one attribute, even when it’s not mapped in dojot’s template;
-> Requesting with dateFrom, dateTo, lastN or firstN and any combination of these parameters;
-> Returning the same syntax for all type of attributes, including JSON;
-> When the attribute is not provided, the service sends back all attributes. 
-> If the request does not contain a valid attribute or has empty data, then the service responds HTTP 404  (not found attribute), as it is in the original History.
-> If the request didn’t match in a route, sends back HTTP 404. 
-> Apply the two converter patterns (Using one for 1 attribute and the other for all attributes requests); 

## Limitations or Drawbacks:
-> When receiving multiple attributes, will be only used the first one. 	
->  If the device requested doesn't exist, the History endpoint returns HTTP 404 response with a message ‘device not found’. Now, it also gives HTTP 404 response, but with the message ‘attr not found’. 


## Configuration

```shell
yarn install
```
## Available Scripts

In the project directory, you can run:

## To run

```shell
yarn start
```

## To test

```shell
yarn test
```


# Docker

The following command creates a docker image to be a proxy for InfluxDB, mocking the History responses.

```
It has three optional arguments:
 DOJOT_VERSION: Set the GUI version
 RETRIEVER_URL:   URL to access Retriever
 PORT: Service port
```

```shell
docker build -f Dockerfile -t [tag name] --build-arg DOJOT_VERSION=[version] --build-arg RETRIEVER_URL=[retriever url] --build-arg PORT=[port] .
```

To run the created image:

```shell
docker run -d [-n name] <tag name>
```