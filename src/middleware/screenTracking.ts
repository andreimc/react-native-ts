// import { Answers } from 'react-native-fabric'

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route)
  }
  return route
}

const screenTracking = ({ getState }) => next => (action) => {
  if (
    action.type !== 'Navigation/NAVIGATE'
    && action.type !== 'Navigation/BACK'
  ) {
    return next(action)
  }

  const currentScreen = getCurrentRouteName(getState().nav)
  const result = next(action)
  const nextScreen = getCurrentRouteName(getState().nav)
  if (nextScreen.routeName !== currentScreen.routeName) {
    // the line below uses the Google Analytics tracker
    // change the tracker here to use other Mobile analytics SDK.
    // Answers.logContentView(nextScreen.routeName, 'screen', nextScreen.key, nextScreen.params)
  }
  return result
}

export default screenTracking
