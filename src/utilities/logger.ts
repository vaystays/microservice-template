import * as winston from 'winston'
import { Papertrail } from 'winston-papertrail'
const ElasticSearch = require('winston-elasticsearch')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
    new winston.transports.File({
      level: 'info',
      filename: 'tmp/info.log',
    }),
  ],
})

let indexPrefix = `ms-dev-log`
if (process.env.NODE_ENV === 'production') {
  indexPrefix = `ms-log`
  logger.add(
    new Papertrail({
      host: 'logs.papertrailapp.com',
      port: 12345,
    }),
  )
}

logger.add(
  new ElasticSearch({
    level: 'info',
    messageType: 'log',
    indexPrefix,
    clientOpts: {
      node: 'https://search-direct-logs-ee6xzcyio6c5qy5wdjiwz7mo7q.us-west-1.es.amazonaws.com',
    },
  }),
)

export default logger
