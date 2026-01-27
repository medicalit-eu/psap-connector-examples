/**
 * The AboutController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/AboutService');
const About = async (request, response) => {
  logRequest("About", request);
  await Controller.handleRequest(request, response, service.about);
};

function logRequest(endpointName, request) {
  console.log(`About.${endpointName} Request received:`);
  console.log("Request path parameters:", request.params);
  console.log("Request body:", request.body);
}

module.exports = {
  About,
};
