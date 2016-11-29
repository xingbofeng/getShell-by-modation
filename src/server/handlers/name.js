export default {
  method: ['GET'],
  path: '/hello',

  config: {
    handler(request, reply) {
      return reply({
        hello: 'hello',
        world: 'world',
      });
    },
  },
};
