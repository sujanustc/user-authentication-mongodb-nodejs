const axios = require('axios');

axios.get('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });

  // const {data} = await axios.get('https://jsonplaceholder.typicode.com/users')
  // .catch(error => {
  //   console.log(error);
  // });

  //   //console.log(data);
  //   res.json(data);