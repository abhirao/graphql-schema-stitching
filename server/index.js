const { ApolloServer, gql } = require('apollo-server');
const { makeRemoteExecutableSchema, introspectSchema, mergeSchemas } = require('graphql-tools');
const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');

const graphqlApis = [
  {
    uri: 'https://countries.trevorblades.com',
  },
  {
    uri: 'http://cyberdyne.lvh.me:3000/graphql?auth_token=admin@cyberdyne.com',
  }
];

const createRemoteExecutableSchemas = async () => {
  let schemas = [];
  for (let i = 0; i < graphqlApis.length; i++) {
    const link = new HttpLink({
      ...graphqlApis[i],
      fetch
    });

    const remoteSchema = await introspectSchema(link);
    const remoteExecutableSchema = makeRemoteExecutableSchema({
      schema: remoteSchema,
      link
    });
    schemas.push(remoteExecutableSchema);
  }
  return schemas;
};

const createNewSchema = async () => {
  const schemas = await createRemoteExecutableSchemas();
  return mergeSchemas({
    schemas
  });
};

const runServer = async () => {
  // Get newly merged schema
  const schema = await createNewSchema();
  // start server with the new schema
  const server = new ApolloServer({ schema });
  server.listen({ port: 5000 }).then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

try {
  runServer();
} catch (err) {
  console.error(err);
}
