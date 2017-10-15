import { StyleProvider } from '@shoutem/theme'
import { View } from '@shoutem/ui'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { AsyncStorage, StatusBar } from 'react-native'
// tslint:disable-next-line:import-name
import codePush from 'react-native-code-push'
import { persistStore } from 'redux-persist'

import { RubiconNoir } from 'shoutem-components'
import AppNavigator from './navigation/AppNavigator'
import { client, configureStore } from './reducers'

const store = configureStore()

class App extends React.Component<any, any> {
  constructor() {
    super()
    this.state = { rehydrated: false }
  }

  componentWillMount() {
    persistStore(store, { storage: AsyncStorage, blacklist: [] }, () => {
      this.setState({ rehydrated: true })
    })
  }

  render () {
    if (!this.state.rehydrated) {
      return null
    }
    return (
      <ApolloProvider store={store} client={client}>
        <StyleProvider style={RubiconNoir}>
          <View styleName='flexible'>
            <StatusBar barStyle='light-content' />
            <AppNavigator />
          </View>
        </StyleProvider>
      </ApolloProvider>
    )
  }
}

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME }

export default codePush(codePushOptions)(App)
