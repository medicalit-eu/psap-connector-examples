/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
*
* returns NG_SOS.Psaps.Api.Abstractions.About.VersionResponse
* */
const about = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
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
  about,
};
