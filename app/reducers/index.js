import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import activeRequestsReducer from 'reducers/activeRequestsReducer';
import authReducer from 'reducers/authReducer';
import dataReducer from 'reducers/dataReducer';
import modalsReducer from 'reducers/modalsReducer';
import notificationsReducer from 'reducers/notificationsReducer';
import reservationReducer from 'reducers/reservationReducer';
import searchReducer from 'reducers/searchReducer';
import shouldFetchReducer from 'reducers/shouldFetchReducer';

const rootReducer = combineReducers({
  api: combineReducers({
    activeRequests: activeRequestsReducer,
    shouldFetch: shouldFetchReducer,
  }),
  auth: authReducer,
  data: dataReducer,
  notifications: notificationsReducer,
  routing: routeReducer,
  ui: combineReducers({
    modals: modalsReducer,
    reservation: reservationReducer,
    search: searchReducer,
  }),
});

export default rootReducer;
