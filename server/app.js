import {config, app} from './src/config/config.js'
import router from './src/resources/contact/contact.routes.js'
import {logger} from './src/api/logger.middleware.js'

app.listen(config.port);
app.use('/',logger );
app.use('/', router);

console.log('App is running on PORT : '+ config.port);
