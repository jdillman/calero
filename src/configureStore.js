import {
  applyMiddleware,
  createStore,
  compose,
  combineReducers,
} from 'redux';
// Reducers
import ui from './modules/UIModule';

// Middleware
import StatusMiddleware from './middleware/StatusMiddleware';

const rootReducer = combineReducers({
  ui,
});

const middleware = applyMiddleware(
  StatusMiddleware,
);

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(middleware);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancers);
}
