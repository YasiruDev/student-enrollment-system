'use strict'
import  *  as  winston  from  'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as moment from 'moment';
import * as os from "os"

const dateFormat = () => {
  return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss:SSS')
}

const processId = () => {
  return process.pid
}

export class LoggingUtils {

  appName = process.env.APP_NAME
  hostName = os.hostname()
  consoleLogLevel = process.env.CONSOLE_LOG_LEVEL
  fileLogLevel = process.env.FILE_LOG_LEVEL
  consoleLogName = 'STDOUT'
  massageType= 'API_CALL'
  fileLogName = 'application-log'
  appLogger = this.getLogger(`${process.env.ROOT_LOG_PATH}/app/`)

  async info (message) {
    this.appLogger.log('info', message )
  }

  async debug (message) {
    this.appLogger.log('debug', message)
  }

  async error (message) {
    this.appLogger.log('error', message)
  }


  getLogger (fileName) {
    return winston.createLogger({
      transports: [
        new winston.transports.Console({
          level: this.consoleLogLevel,
          format: winston.format.printf((info) => {
            return `${dateFormat()}|[${processId()}]|${this.hostName}|${info.level.toUpperCase()}|${this.consoleLogName}|${this.appName}|${this.massageType}|${info.message} `
          })
        }),
        new DailyRotateFile({
          level: this.fileLogLevel,
          format: winston.format.printf((info) => {
            return `${dateFormat()}|[${processId()}]|${this.hostName}|${info.level.toUpperCase()}|${this.consoleLogName}|${this.appName}|${this.massageType}|${info.message} `
          }),
          filename: `${fileName}${this.appName}-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '30d'
        })
      ]
    })
  }
  
}
