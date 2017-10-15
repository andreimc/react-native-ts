import * as React from 'react'
import { BackHandler, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { addNavigationHelpers, NavigationActions,
  NavigationStackScreenOptions, StackNavigator, StackNavigatorConfig, TabBarBottom, TabNavigator
} from 'react-navigation'
// tslint:disable-next-line:import-name
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition'
import { connect } from 'react-redux'
import { noirThemeVariables } from 'shoutem-components'

const colorComplement = '#FFF'
// tslint:disable-next-line:import-name
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'

const headerTitleStyle:StyleProp<TextStyle> = {
  color: 'white',
  textAlign: 'center',
  alignSelf:'center',
}
const headerStyle:StyleProp<ViewStyle> = {
  backgroundColor: noirThemeVariables.navBarBackground
}

const navigationOptions:NavigationStackScreenOptions = {
  headerStyle,
  headerTitleStyle
}
const stackConfig:StackNavigatorConfig = {
  navigationOptions,
  transitionConfig: getSlideFromRightTransition
}

const tabNav = TabNavigator(
  {
    CoinList: {
      screen: HomeScreen,
    },
    Favorites: {
      screen: SettingsScreen,
    },
  },
  {
    lazy: true,
    swipeEnabled: false,
    animationEnabled: false,
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom,
    tabBarOptions: {
      style: {
        backgroundColor: noirThemeVariables.navBarBackground
      },
      activeTintColor: colorComplement,
    },
  }
)

// tslint:disable-next-line:variable-name
export const AppNavigator = StackNavigator(
  {
    Main: {
      screen: tabNav,
      path: 'main',
    },
  },
  stackConfig
)

interface NavigationProps {
  dispatch: any
  nav: any
}
class AppNavigatorWrapper extends React.Component<NavigationProps, any> {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props
    if (nav.index === 0) {
      return false
    }
    dispatch(NavigationActions.back())
    return true
  }
  render() {
    const { dispatch, nav } = this.props
    return <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})

export default connect(mapStateToProps)(AppNavigatorWrapper)
