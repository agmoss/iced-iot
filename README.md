<h1 align="center">Iced IoT</h1>

<div align="center">
  <img src="https://m0ss.blob.core.windows.net/media/ice-tea-color.png" alt="Logo" width="100" height="100"/>
</div>
<div align="center">
  <strong>IoT Device Monitoring and Orchestration</strong>
</div>
<div align="center">
  A refreshing IoT platform!
</div>

<br />

<div align="center">
  <!-- Dependencies -->
  <a>
    <img src="https://img.shields.io/david/agmoss/iced-iot" alt="Dependencies" />
  </a>
  <!-- Size -->
  <a>
    <img src="https://img.shields.io/github/languages/code-size/agmoss/iced-iot" alt="Code Size" />
  </a>
  <!-- Language -->
  <a>
    <img src="https://img.shields.io/github/languages/top/agmoss/iced-iot" alt="Language" />
  </a>
  <!-- Website -->
  <a>
    <img src="https://img.shields.io/website?down_color=red&down_message=down&up_color=orange&up_message=up&url=https%3A%2F%2Ficediot.com%2F" alt="Website" />
  </a>
  <!-- Server -->
  <a>
    <img src="https://img.shields.io/website?down_color=red&down_message=down&label=server&up_color=orange&up_message=up&url=https%3A%2F%2Fiotsimbackend.azurewebsites.net%2Fapi%2Fdevices%2Ffacility%2Ffacility_01%2Ftype%2Ftank%3Flast%3Dtrue" alt="Server" />
  </a>
  <!--CircleCI Build -->
  <a>
    <img src="https://img.shields.io/circleci/build/github/agmoss/iced-iot/master" alt="Built Status">
  </a>
</div>

<div align="center">
  <h3>
    <a href="https://icediot.com/">
      WebApp
    </a>
    <span> | </span>
    <a href="https://icediot.com/about">
      About
    </a>
  </h3>
</div>

<div align="center">
  <sub>A personal project built by
  <a href="https://github.com/agmoss">Andrew Moss</a>
</div>

## Table of Contents
- [Features](#features)
- [Design Philosophy](#design-philosophy)
- [Platform Architecture](#platform-architecture)
- [Associated Repo's](#associated-repo's)
- [Tools](#tools)

## Features
- __RealTime Device Information:__ Accurate and up to date info and analytics
- __Scalable:__ Built with Docker, CosmosDB, and NGINX for scalability and resilience
- __Modular:__ Microservices architecture
- __Current:__ Built with modern cloud tooling and design patterns

## Design Philosophy
Iced IoT is a low overhead and robust IoT solution. The user can add facilities and devices of any variety on the IoT hub with minimal configuration. Added devices are instantly visible on the web app for tracking and analytics. 

The platform is a series of microservices that can be independently scaled and maintained. The entire platform is written in JavaScript with heavy use of non-blocking async code. The React front end is an MVC style app with presentation and container components. All application services are dockerized and running as container instances in Azure. Continuous integration and delivery is handled via CircleCI. 

## Platform Architecture
<div align="center">
  <a>
    <img src="https://m0ss.blob.core.windows.net/media/system-dark.png" alt="Architecture" />
  </a> 
</div>
<br />

## Associated Repo's
- [Express API's](https://github.com/agmoss/iotsimbackend) - Backend structure for the React frontent
- [Azure Function App](https://github.com/agmoss/IotHub_EventHub_MongoDB) - Re-directing IoT hub messages into CosmosDB
- [IoT Devices](https://github.com/agmoss/iot-simulation) - Simulated IoT devices and facilities

## Tools
- [React](https://reactjs.org/) - Frontend Framework
- [NGINX](https://www.nginx.com/) - Webserver
- [Docker](https://www.docker.com/) - Container platform
- [Azure IoT Hub](https://azure.microsoft.com/en-ca/services/iot-hub/) - Two way IoT device communication
- [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/) - Serverless compute
- [CosmosDB](https://azure.microsoft.com/en-ca/services/cosmos-db/) - Globally distributed, multi-model database service
- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [Express.js](https://expressjs.com/) - Node.js web application framework
- [CircleCI](https://circleci.com/) - Continuous integration and delivery service