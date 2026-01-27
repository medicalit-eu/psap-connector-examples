/**
 * The IncidentController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/IncidentService');
const AddPsap = async (request, response) => {
  logRequest("AddPsap", request);
  await Controller.handleRequest(request, response, service.addPsap);
};

const Close = async (request, response) => {
  logRequest("Close", request);
  await Controller.handleRequest(request, response, service.close);
};

const Create = async (request, response) => {
  logRequest("Create", request);
  await Controller.handleRequest(request, response, service.create);
};

const ReplacePosition = async (request, response) => {
  logRequest("ReplacePosition", request);
  await Controller.handleRequest(request, response, service.replacePosition);
};

const UpdateBatteryLevel = async (request, response) => {
  logRequest("UpdateBatteryLevel", request);
  await Controller.handleRequest(request, response, service.updateBatteryLevel);
};

const UpdateInternetConnectionType = async (request, response) => {
  logRequest("UpdateInternetConnectionType", request);
  await Controller.handleRequest(request, response, service.updateInternetConnectionType);
};

const UpdatePosition = async (request, response) => {
  logRequest("UpdatePosition", request);
  await Controller.handleRequest(request, response, service.updatePosition);
};

function logRequest(endpointName, request) {
  console.log(`Incident.${endpointName} Request received:`);
  console.log("Request parameters:", request.params);
  console.log("Request body:", request.body);
}

module.exports = {
  AddPsap,
  Close,
  Create,
  ReplacePosition,
  UpdateBatteryLevel,
  UpdateInternetConnectionType,
  UpdatePosition,
};
