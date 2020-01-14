// implement your API here
const express = require('express');

const DB = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', function(request, response) {
    response.send({ hello: 'Test' });
  });
  
  server.get('/api/users', (req, res) => {
    DB.find() 
      .then(db => {
        console.log('users', db);
        res.status(200).json(db);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMessage: "The users information could not be retrieved.",
        });
      });
  });

server.get('/api/users/:id', (req, res) =>{
    DB.findById(id)
    .then(db => {
        console.log('users', db);
        res.status(200).json(db);
    })
    .catch(error => {
        console.log(error);
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMessage: "The user with the specified ID does not exist."
        })
    })
})

  server.post('/api/users', (request, res) => {
    const newUser = request.body; 
    // const newUser = {name: 'test', bio: 'test'};
  
    DB.insert(newUser)
      .then(db => {
        res.status(201).json(db);
      })
      .catch(error => {
        console.log(error);
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        });
        
      });
  });
  
  server.delete('/api/users/:id', (request, res) => {
    const id = request.params.id;
  
    DB.remove(id)
      .then(deleted => {
        res.status(200).json(deleted);
      })
      .catch(error => {
          console.log(error);
          res.status(404).json({
            message: "The user with the specified ID does not exist." ,
          })
      })
      .catch(error => {
        console.log(error);
        // handle the error
        res.status(500).json({
            errorMessage: "The user could not be removed" ,
        });
      });
  });

  server.put('/api/users/:id', (request, res) => {
    const newUser = request.body; 

      DB.update(newUser)
      .then(db => {
        res.status(200).json(db);
      })

      .catch(error =>{
        console.log(error);
        res.status(400)({
            errorMessage: "Please provide name and bio for the user."
        })

    })
      .catch(error =>{
          console.log(error);
          res.status(404)({
            message: "The user with the specified ID does not exist."
          })

      })
      
    .catch(error =>{
        console.log(error);
        res.status(500)({
            errorMessage: "The user information could not be modified."
        })

    })
  })
  

  
  const port = 9000;
  server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));