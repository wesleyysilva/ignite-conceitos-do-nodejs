require("express-async-errors");
const express = require('express');
const cors = require('cors');

const { v4: uuid } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { name, username } = request.body;

  const user = users.find((user) => user.username === username);

  if (!user) {
    response.status(401).json({
      status: "error",
      message: `The user not exists`,
    });
  }

  next();
}

app.post('/users', (request, response) => {

  const { name, username } = request.body;

  const user = users.find((user) => user.username === username);

  if (user) {
    response.status(401).json({
      status: "error",
      message: `The user exists`,
    });
  }

  users.push(
    {
      id: uuid(),
      name,
      username,
      toodos: []
    }
  );

  return response.status(201).json(users);
});

app.get('/users', (request, response) => {
  return response.json(users);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { username } = request.header.username;

  const { user } = users.find((user) => user.username === username);

  return response.json(user.todo);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;