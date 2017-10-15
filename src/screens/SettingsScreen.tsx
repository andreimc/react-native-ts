import { Examples, Screen } from '@shoutem/ui'
import * as React from 'react'

const styles = {
  container: {
    flex: 1
  }
}

class SettingsScreen extends React.Component<any> {
  static navigationOptions = {
    title: 'Settings',
  }


  render() {
    return (
      <Screen style={styles.container}>
        <Examples />
      </Screen>
    )
  }
}

export default SettingsScreen
