import { compose, createStore, applyMiddleware } from 'redux'
// import logger from 'redux-logger'

import { rootReducer } from './root-reducer'

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action)
  }
  console.log('type: ', action.type)
  console.log('payload: ', action.payload)
  console.log('currentState', store.getState())

  next(action)

  console.log('next state: ', store.getState())
}

//every store needs reducers
//root reducer is a combination of all the reducers, like one big reducer
//we need rootReducer in order to generate the store
//logger allows to see how the state looks like before the action is dispatch, what the action is and how the state in turn looks after the action

//middleware are library helpers than run before action hits the reducer
//whenever dispatch action. before the action hit the reducer hit the middleware first
const middleWares = [loggerMiddleware]

const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReducer, undefined, composedEnhancers)
