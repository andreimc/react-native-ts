import { NavigationActions } from 'react-navigation'
import { AppNavigator } from '../navigation/AppNavigator'

// Start with two routes: The Main screen, with the Login screen on top.

const initialNavState = AppNavigator.router.getStateForAction(NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: 'Main',
    }),
  ],
}), undefined)


export default function nav(state = initialNavState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state)

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}
