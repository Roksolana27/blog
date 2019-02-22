const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const logger = require('./logger/index');

require('./models/User');
require('./models/Blog');
require('./services/passport');
require('./services/cache');


console.log(process.env);

try{
  mongoose.Promise = global.Promise;
  mongoose.connect(keys.mongoURI, { useMongoClient: true });

  const app = express();

  app.use(bodyParser.json());
  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  require('./routes/authRoutes')(app);
  require('./routes/blogRoutes')(app);
  require('./routes/uploadRoutes')(app);

  // make sure server serves react client files in both production mode and ci
  if (['production', 'ci'].includes(process.env.NODE_ENV)) {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('client', 'build', 'index.html'));
    });
  }

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    logger.log({
      level: 'info',
      message: `Listening on port ${PORT}`
    });
  });
}catch(e){
  logger.error({
    level: 'error',
    message: e
  });
}