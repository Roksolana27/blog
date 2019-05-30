const winston = require('winston');
const { combine, timestamp, prettyPrint } = winston.format;

// winston.addColors({
//   debug: 'green',
//   info:  'cyan',
//   silly: 'magenta',
//   warn:  'yellow',
//   error: 'red'
// });

module.exports = winston.createLogger({
  format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [new winston.transports.Console()]
});


