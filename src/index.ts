import { GraphQLServer } from 'graphql-yoga'
import * as Decimal from 'graphql-type-decimal'
import * as Email from 'graphql-type-email'
import * as UUID from 'graphql-type-uuid'
import * as JSON from 'graphql-type-json'
import logger from './utilities/logger'
import * as fs from 'fs'

const resolvers = {
  Decimal,
  Email,
  UUID,
  JSON,

  Query: {
    async health() {
      return {
        type: 'OK',
        payload: {
          package: require('../package.json'),
        },
      }
    },

    async logs() {
      return fs.readFileSync('tmp/info.log').toString('utf8')
    },
  },
}

const server = new GraphQLServer({
  typeDefs: [
    // './schemas/scalars.graphql',
    // './schemas/enums.graphql',
    './schemas/root.graphql',
  ],
  resolvers,
})

server.start(() => logger.info('Server is running on http://localhost:4000'))
