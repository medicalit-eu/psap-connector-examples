# psap-connector-examples
If OpenAPI specification changes, server has to be regenerated using command below.

## Before generation
- To allow additional properties in requests it is needed to update openapi specification file.
    - Search and replace:
      1. *"additionalProperties": false* -> *additionalProperties": true*
      1. *"additionalProperties": { }* -> *additionalProperties": true*

## Api stub generation
- Api was generated using command: `docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate -i /local/open-api-psap-connector.json -g nodejs-express-server -o /local/api-stub`
- This also rewrites all changes (exclusions can be enabled - more in *api-stub/.openapi-generator-ingore*)

## Fix generation problems
Generator creates wrong names for functions in controllers.
- Rename all functions in IncidetController and AboutController to start with upper case letter (e.g. addPsap -> AddPsap)

## How to run for the first time
  1. `cd api-stub`
  2. `npm install`
  3. `node index.js` 
- After this, only `node index.js` is needed

## Testing from postman
- Bearer token is needed, but it is not validated (so any string can be used).