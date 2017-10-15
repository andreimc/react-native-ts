import { ApolloClient, createNetworkInterface } from 'apollo-client'
import { Store } from 'react-redux'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { autoRehydrate } from 'redux-persist'
import reduxThunk from 'redux-thunk'
import { screenTracking, storeReview } from '../middleware'
import nav from './nav'

export const appReducer = (reducers: object) => combineReducers({
  nav,
  ...reducers,
})

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql'
})

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}  // Create the header object if needed.
    }
    req.options.headers['x-api-key'] = 'develop'
    next()
  }
}])

export const client = new ApolloClient({
  networkInterface
})

export function configureStore():Store<any> {
  const composeEnhancers = __DEV__ ? require('redux-devtools-extension').composeWithDevTools : compose
  const store = createStore(
    appReducer({ apollo: client.reducer() }),
    { /* Initial state */ },
    composeEnhancers(
      applyMiddleware(
        reduxThunk,
        screenTracking,
        storeReview,
        client.middleware()
      ),
      autoRehydrate(),
    )
  )

  return store
}

