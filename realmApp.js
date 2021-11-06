import Realm from 'realm';

import settings from './app/config/settings';

// Invokes the shared instance of the Realm app.
const app = new Realm.App({ id: settings.REALM_APP_ID });

export default app;
