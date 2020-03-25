import * as winston from 'winston'
import { Papertrail } from 'winston-papertrail'

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

if (process.env.NODE_ENV === 'production') {
  logger.add(
    new Papertrail({
      host: 'logs.papertrailapp.com',
      port: 12345,
    }),
  )
}

export default logger
