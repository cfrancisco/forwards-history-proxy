# GUI Proxy [![CodeFactor](https://www.codefactor.io/repository/github/cfrancisco/gui_v1_proxy/badge)](https://www.codefactor.io/repository/github/cfrancisco/gui_v1_proxy) [![codecov](https://codecov.io/gh/cfrancisco/gui_v1_proxy/branch/development/graph/badge.svg)](https://codecov.io/gh/cfrancisco/gui_v1_proxy) [![License badge](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)


The GUI Proxy allows the Dojot GUI v1 to be compliant with InfluxDb, which is used in newer versions of Dojot.

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