export function checkStatus(response, onSuccess, onError) {
  var resp = response.json();
  switch (response.status) {
    case 200:
      return resp.then(onSuccess);
    case 400:
      return resp.then(onError);
    case 404:
      return onError('Not found');
  }
}

export function postOptions(body, token, method = 'POST') {
  return {
    credentials: 'include',
    method: method,
    headers: {
      'X-TOKEN': token
    },
    body: JSON.stringify(body)
  };
}

export function getOptions(token, method = 'GET') {
  return {
    credentials: "include",
    method: method,
    headers: {
      'X-TOKEN': token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
}
