[ Client ] - send a request --> [ Server (API) ]

[ Server ] - send a response -- > [ Client ]

```js
const request = {
  name: 'Gandalf'

  bio: 'The White'

};

const createUser = function(url, data) {
  return axios.post(url, data); // the data goes in request.body
};
```
