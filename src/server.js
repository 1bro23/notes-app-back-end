require('dotenv').config();

const Hapi = require('@hapi/hapi');
const NotesService = require("./services/postgres/NotesService");
const notes = require("./api/notes");
const NotesValidator = require('./validator/notes');

// users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const init = async () => {
  const notesService = new NotesService();
  const usersService = new UsersService();

  const server = Hapi.server({
    port: process.env.port,
    host: process.env.host,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin:notes,
      options:{
        service:notesService,
        validator:NotesValidator
      }
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      }
    }
  ])

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
