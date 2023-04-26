const winston = require('winston');

const initialiseLogger = (context) => {
  const logger = winston.createLogger({
    exitOnError: false,
    format: winston.format.combine(
      winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      winston.format.label({label: (context ? context : '<no context>')}),
      winston.format.json(),
    ),
  });

  // no need for log files in the cloud
  if (process.env.SERVERLESS === 'true') {
    logger.add(new winston.transports.Console({
      handleExceptions: true,
      format: winston.format.printf((info) => `${info.timestamp} ${info.level} ${info.label}: ${info.message}`),
      level: 'info',
    }));
  } else {
    logger.add(new winston.transports.Console({
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf((info) => `${info.timestamp} ${info.level} ${info.label}: ${info.message}`),
      ),
      level: 'debug',
    }));
    logger.add(new winston.transports.File({handleExceptions: true, filename: 'error.log', level: 'error'}));
    logger.add(new winston.transports.File({handleExceptions: true, filename: 'winston.log', level: 'debug'}));
  }

  return logger;
};

module.exports = {initialiseLogger};