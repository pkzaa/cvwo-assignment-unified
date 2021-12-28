// Miscellaneous helper functions

export function fallback(value, fallbackValue) {
  return value !== undefined ? value : fallbackValue
}

// This *really* should be specified by ECMA...
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export function api(endpoint, method='GET', body, fPrefetch=()=>{}, fSuccess=()=>{}, fFailure=()=>{}, fErrorMessage=()=>{}) {
  const fetchOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
    },
    body: body,
  }
  
  fPrefetch();
  
  fetch(endpoint, fetchOptions)
    .then(response => {
      if(response.ok) return response.json();
      else throw response;
    })
    .then(data => fSuccess(data))
    .catch(error => {
      fFailure();
      error.json().then((body) => fErrorMessage(body.message));
    });
}
