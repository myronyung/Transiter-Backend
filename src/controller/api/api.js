/* eslint-disable max-len */
Error.stackTraceLimit = 100;

const routes = {
  // Miscellaneous
  'GET:/ping': require('./miscellaneous/ping'),

  // User //
  // Create, get, delete
  'POST:/user': require('./user/user_create'),
  'GET:/user/userRn/{userRn}': require('./user/user_get'),
  'DELETE:/user/userRn/{userRn}': require('./user/user_remove'),

  // Update
  'PUT:/user/userRn/{userRn}': require('./user/user_update'),
  // User //


  // Bus stop //
  // Create and delete
  'POST:/busStop/{busStop}': require('./transiter/stop_review/transiter_stop_review_create'),
  'POST:/busStop/{busStop}/anonymous': require('./transiter/stop_review/transiter_stop_review_create_anonymous'),
  'DELETE:/busStop/{busStop}/stopReview/{stopReviewRn}': require('./transiter/stop_review/transiter_stop_review_remove'),

  // Update
  'PUT:/busStop/{busStop}/stopReview/{stopReviewRn}': require('./transiter/stop_review/transiter_stop_review_update'),

  // List
  'GET:/busStop/{busStop}/stop_reviews': require('./transiter/stop_review/query/transiter_stop_review_list'),
  // Bus stop //
};

exports.call = async (event, context, callback) => {
  Error.stackTraceLimit = 100;
  try {
    const {api, bodySchema, pathParamSchema, queryParamSchema} = getApi(event.httpMethod, event.resource);
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

    console.debug({httpMethod: event.httpMethod, resource: event.resource, body, pathParam, queryParam});

    const result = await api(body, pathParam, queryParam);

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

const getAllowOrigin = () => {
  return process.env.ALLOW_ORIGIN;
};
