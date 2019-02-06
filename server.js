const Hapi = require('hapi');

const { NODE_ENV } = process.env;

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: 8000
});

// Add the route
server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => 'hello'
});

server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, h) => 'hello world'
});

if (NODE_ENV === 'development') {
  server.events.on('response', request => {
    console.log(
      `${request.info.remoteAddress}: ${request.method.toUpperCase()} ${request.url.pathname} --> ${
        request.response.statusCode
      }`
    );
  });
}

// Start the server
const start = async () => {
  await server.start();

  console.log('Server running at:', server.info.uri);
};

start();
