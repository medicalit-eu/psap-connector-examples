/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Incident PSAP was added.
* This generally occurs whenever caller's position is altered significantly - spanning into another region or another emergency service was requested.    Requires incident.update privileges
*
* id UUID Incident id.
* nGSOSPsapsApiAbstractionsV2AddPsapBody NGSOSPsapsApiAbstractionsV2AddPsapBody  (optional)
* no response value expected for this operation
* */
const addPsap = ({ id, nGSOSPsapsApiAbstractionsV2AddPsapBody }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        nGSOSPsapsApiAbstractionsV2AddPsapBody,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Incident was closed.
* Requires incident.close privileges
*
* id UUID 
* nGSOSPsapsApiAbstractionsV2CloseIncidentBody NGSOSPsapsApiAbstractionsV2CloseIncidentBody Incident id. (optional)
* no response value expected for this operation
* */
const close = ({ id, nGSOSPsapsApiAbstractionsV2CloseIncidentBody }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        nGSOSPsapsApiAbstractionsV2CloseIncidentBody,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Incident was created.
* Requires incident.create privileges
*
* nGSOSPsapsApiAbstractionsV2CreateIncidentBody NGSOSPsapsApiAbstractionsV2CreateIncidentBody  (optional)
* returns UUID
* */
const create = ({ nGSOSPsapsApiAbstractionsV2CreateIncidentBody }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        nGSOSPsapsApiAbstractionsV2CreateIncidentBody,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Incident position was replaced. Invalidates previous position(s).
* Requires incident.update privileges
*
* id UUID Incident id.
* nGSOSPsapsApiAbstractionsV1UpdatePositionBody NGSOSPsapsApiAbstractionsV1UpdatePositionBody  (optional)
* no response value expected for this operation
* */
const replacePosition = ({ id, nGSOSPsapsApiAbstractionsV1UpdatePositionBody }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        nGSOSPsapsApiAbstractionsV1UpdatePositionBody,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Incident battery level was updated.
* Requires incident.update privileges
*
* id UUID Incident id.
* nGSOSPsapsApiAbstractionsV1UpdateBatteryLevelBody NGSOSPsapsApiAbstractionsV1UpdateBatteryLevelBody  (optional)
* no response value expected for this operation
* */
const updateBatteryLevel = ({ id, nGSOSPsapsApiAbstractionsV1UpdateBatteryLevelBody }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        nGSOSPsapsApiAbstractionsV1UpdateBatteryLevelBody,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Incident internet connection type was updated.
* Requires incident.update privileges
*
* id UUID Incident id.
* nGSOSPsapsApiAbstractionsV1UpdateInternetConnectionTypeBody NGSOSPsapsApiAbstractionsV1UpdateInternetConnectionTypeBody  (optional)
* no response value expected for this operation
* */
const updateInternetConnectionType = ({ id, nGSOSPsapsApiAbstractionsV1UpdateInternetConnectionTypeBody }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        nGSOSPsapsApiAbstractionsV1UpdateInternetConnectionTypeBody,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Incident position was updated. Received a more accurate position.
* Requires incident.update privileges
*
* id UUID Incident id.
* nGSOSPsapsApiAbstractionsV1UpdatePositionBody NGSOSPsapsApiAbstractionsV1UpdatePositionBody  (optional)
* no response value expected for this operation
* */
const updatePosition = ({ id, nGSOSPsapsApiAbstractionsV1UpdatePositionBody }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        nGSOSPsapsApiAbstractionsV1UpdatePositionBody,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  addPsap,
  close,
  create,
  replacePosition,
  updateBatteryLevel,
  updateInternetConnectionType,
  updatePosition,
};
