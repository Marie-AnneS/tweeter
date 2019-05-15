
const request = (method, url, async) => {
    // Create an xmlhttprequest
    const xhr = new XMLHttpRequest();
  
    // Setting up the connection with the options
    xhr.open(method, url, async);
  
    // Issuing the request
    xhr.send();
  
    // Event handler when the request is complete and we have a response
    xhr.onload = () => {
      // checking the status of the response
      if (xhr.status >= 200 && xhr.status < 300) {
        // display the response
        console.log(xhr.response);
      } else {
        // display the error
        console.log('Error: ${xhr.status}');
      }
    };
  
    // Event handler if we have an error with the request
    xhr.onerror = () => {
      console.log('Error with the resquest');
    };
  };
  
  const url = 'http://jsonplaceholder.typicode.com/posts';
  
  request('GET', url, true);