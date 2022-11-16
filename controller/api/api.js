/* eslint-disable max-len */
Error.stackTraceLimit = 100;

const routes = {
  // Miscellaneous
  'GET:/ping': require('./miscellaneous/ping'),
};

const {tokenParser} = require('../../permission/authentication/verify');

exports.call = async (event, context, callback) => {
  Error.stackTraceLimit = 100;
  try {
    const {api, auth, bodySchema, pathParamSchema, queryParamSchema} = getApi(event.httpMethod, event.resource);
    if (!api) {
      return httpReturn('404', 'API NOT SUPPORTED');
    }

    let body = JSON.parse(event.body);
    let pathParam = event.pathParameters;
    let queryParam = event.queryStringParameters;

    if (bodySchema) {
      if (typeof bodySchema === 'function') {
        body = bodySchema(body);
      } else {
        const {error} = bodySchema.validate(body);
        if (error) {
          return httpReturn('400', {message: 'INVALID_BODY', error: error});
        }
      }
    }

    if (pathParamSchema) {
      if (typeof pathParamSchema === 'function') {
        pathParam = pathParamSchema(pathParam);
      } else {
        const {error} = pathParamSchema.validate(pathParam);
        if (error) {
          return httpReturn('400', {message: 'INVALID_PATH_PARAM', error: error});
        }
      }
    }

    if (queryParamSchema) {
      if (typeof queryParamSchema === 'function') {
        queryParam = queryParamSchema(queryParam);
      } else {
        const {error} = queryParamSchema.validate(queryParam);
        if (error) {
          return httpReturn('400', {message: 'INVALID_QUERY_PARM', error: error});
        }
      }
    }

    let requester = null;
    if (auth) {
      requester = await tokenParser(event);
      await auth(body, pathParam, queryParam, requester);
    }

    console.debug({httpMethod: event.httpMethod, resource: event.resource, body, pathParam, queryParam, requester});

    const result = await api(body, pathParam, queryParam, requester);

    return return200(result);
  } catch (e) {
    return handleError(e, event);
  }
};

const getApi = (method, path) => {
  const methodPath = `${method}:${path}`;
  const module = routes[methodPath];
  if (module) {
    return module;
  } else {
    return {};
  }
};

const httpReturn = (code, message) =>{
  let body = {};
  if (typeof message === 'string') {
    body.message = message;
  } else if (message) {
    body = message;
  }

  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': getAllowOrigin(),
    },
    body: JSON.stringify(body),
  };
};

const return200 = (message) => {
  return httpReturn(200, message);
};

const handleError = (e, event) => {
  if (e.errorCode >= 400 || e.errorCode < 500) {
    console.info(e);
    return httpReturn(e.errorCode, e.message);
  } else if (e.message) {
    const outputLog = {
      httpMethod: event.httpMethod,
      resource: event.resource,
      pathParameters: event.pathParameters,
      queryStringParameters: event.queryStringParameters,
      body: event.body,
      error: e.message,
      stack: e.stack,
    };
    console.error(outputLog);
    return httpReturn(500, 'error_occured');
  } else {
    console.error(e);
    return httpReturn(500, 'error_occured');
  }
};
