import { UI_READY } from 'modules/UIModule';
import Urls from 'lib/urls';

function StatusMiddleware(store) {
  return next => (action) => {
    switch (action.type) {
      case UI_READY:
        appStart(store.dispatch);
        break;
      default:
    }

    return next(action);
  };
}

// Version check
function appStart() {
  const url = Urls.GITHUB_PACKAGE_JSON;
  const init = { method: 'GET' };

  fetch(url, init).then(response => response.json())
    .then((resp) => {
      console.log(resp);
    }).catch(() => {
      // dispatch(goOffline);
    });
}

export default StatusMiddleware;
