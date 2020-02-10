
export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response): Response {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new ResponseError(response);
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url: string, options?: RequestInit): Promise<{ } | { err: ResponseError }> {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => (data))
    .catch((err) => (err));
}

export function postRequest(url, requestBody, requestHeaders = {}) {
    console.log(`Headers:`);
    console.log(requestHeaders);
    
    
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: new Headers(requestHeaders)
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(json => json);
  }
  
  export function putRequest(url, requestBody) {
    return fetch(url, {
      method: 'PUT',
      body: requestBody,
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(json => json);
  }
  
  export function getRequest(url) {
    return fetch(url, {
       method: 'GET'
     })
     .then(checkStatus)
     .then(parseJSON)
     .then((json) => {
       return json
     })
  }
