import Bugsnag from '@bugsnag/expo';

const log = (error) => Bugsnag.notify(error);

const start = () => {
  if (!Bugsnag._client) {
    Bugsnag.start();
  }
};

export default { log, start };
