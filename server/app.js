import {app,config} from './src/config/config.js'
import router from './src/resources/contact/contact.routes.js'
import {logger} from './src/api/logger.middleware.js'
import mongoose from './src/config/database.config.js';
import { User } from './src/resources/user/user.model.js';
import { Client } from './src/resources/client/client.model.js';
import {createUser} from './src/resources/user/user.controller.js'
import {createClient} from './src/resources/client/client.controller.js';
import { getContacts} from './src/resources/contact/contact.controller.js'

app.listen(config.port);
app.use('/',logger );
app.use('/', router);



console.log('App is running on PORT : '+ config.port);
