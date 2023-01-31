const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

function queryStringify(data: unknown) {
  if (!data) {
    return '';
  }

  let result = Object.keys(data).length > 0 ? '?' : '';
  for (const [key, value] of Object.entries(data)) {
    result += key + '=' + value + '&';
  }

  return result.slice(0, -1);
}

type Options = {
  data?: {},
  headers?: Map<string, string>,
  timeout?: number,
}

type HTTPMethod = <TResponse = unknown>(url: string, options?: Options) => Promise<TResponse>

export default class HTTPTransport {
  get: HTTPMethod = (url, options) => {
    return this.request(url + queryStringify(options?.data), METHODS.GET, options);
  };

  put: HTTPMethod = (url, options) => {
    return this.request(url, METHODS.PUT, options);
  };

  post: HTTPMethod = (url, options) => {
    return this.request(url, METHODS.POST, options);
  };

  delete: HTTPMethod = (url, options) => {
    return this.request(url, METHODS.DELETE, options);
  };  

  request = <TResponse = unknown>(url: string, method: string, options?: Options): Promise<TResponse> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.timeout = options?.timeout ?? 5000;

      if (options?.headers) {
        for (const [key, value] of options.headers.entries()) {
          xhr.setRequestHeader(key, value);
        }
      }
      else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      }

      xhr.withCredentials = true;

      xhr.onload = function () {
        resolve(isJsonString(xhr.response) ? JSON.parse(xhr.response) : xhr.response);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !options?.data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(options.data));
      }
    });
  };
}

function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}
